/*******************************************************************************
 *   Copyright (c) 2013 Álan Crístoffer
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a
 *   copy of this software and associated documentation files (the "Software"),
 *   to deal in the Software without restriction, including without limitation
 *   the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *   and/or sell copies of the Software, and to permit persons to whom the
 *   Software is furnished to do so, subject to the following conditions:
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *   FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *   DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

#include <string>
#include <algorithm>
#include <windows.h>
#include <microhttpd.h>
#include <thread>
#include <fstream>
#include <iostream>

#include "include/cef_app.h"
#include "include/cef_browser.h"
#include "ClientApp.hpp"
#include "ClientHandler.hpp"

constexpr bool devMode = true;
constexpr int PORT = 5175;
bool serverRunning = false;

// Server

// 檔案系統根目錄
const std::string BASE_DIR = "./dist";

// 處理 HTTP 請求的回調函數
static MHD_Result request_handler(void* cls, struct MHD_Connection* connection,
                          const char* url, const char* method,
                          const char* version, const char* upload_data,
                          size_t* upload_data_size, void** ptr) {
    if (strcmp(method, "GET") != 0) {
        return MHD_NO; // 只處理 GET 請求
    }

    // 構建檔案路徑
    std::string file_path = BASE_DIR + (url[0] == '/' ? url : "/" + std::string(url));
    if (file_path == BASE_DIR + "/") {
        file_path += "index.html"; // 預設檔案
    }

    // 打開檔案
    std::ifstream file(file_path, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "File not found: " << file_path << ", Error: " << std::strerror(errno) << std::endl;
        const char* error_page = "<html><body><h1>404 Not Found</h1></body></html>";
        struct MHD_Response* response = MHD_create_response_from_buffer(strlen(error_page),
                                                                       (void*)error_page,
                                                                       MHD_RESPMEM_PERSISTENT);
        MHD_Result ret = MHD_queue_response(connection, MHD_HTTP_NOT_FOUND, response);
        MHD_destroy_response(response);
        return ret;
    }

    // 讀取檔案內容
    file.seekg(0, std::ios::end);
    size_t file_size = static_cast<size_t>(file.tellg());  // 避免 tellg() 返回 -1
    file.seekg(0, std::ios::beg);

    if (file_size == 0) {
        file.close();
        return MHD_NO;
    }

    char* buffer = new char[file_size];
    file.read(buffer, file_size);
    file.close();

    // 創建回應
    struct MHD_Response* response = MHD_create_response_from_buffer(file_size,
                                                                   buffer,
                                                                   MHD_RESPMEM_MUST_FREE);
    if (!response) {
        delete[] buffer;
        return MHD_NO;
    }

    // 設置 MIME 類型
    if (file_path.find(".html") != std::string::npos) {
        MHD_add_response_header(response, "Content-Type", "text/html");
    } else if (file_path.find(".css") != std::string::npos) {
        MHD_add_response_header(response, "Content-Type", "text/css");
    } else if (file_path.find(".js") != std::string::npos) {
        MHD_add_response_header(response, "Content-Type", "application/javascript");
    } else if (file_path.find(".png") != std::string::npos) {
        MHD_add_response_header(response, "Content-Type", "image/png");
    } else if (file_path.find(".jpg") != std::string::npos || file_path.find(".jpeg") != std::string::npos) {
        MHD_add_response_header(response, "Content-Type", "image/jpeg");
    } else if (file_path.find(".svg") != std::string::npos) {
        MHD_add_response_header(response, "Content-Type", "image/svg+xml");
    }

    MHD_Result ret = MHD_queue_response(connection, MHD_HTTP_OK, response);
    MHD_destroy_response(response);
    return ret;
}

// 啟動伺服器
void start_server() {
    if (!serverRunning) {
        struct MHD_Daemon* daemon = MHD_start_daemon(
            MHD_USE_INTERNAL_POLLING_THREAD,
            PORT,
            NULL,
            NULL,
            &request_handler, // 正確的函式對應
            NULL,
            MHD_OPTION_END
        );

        if (!daemon) {
            std::cerr << "Failed to start server" << std::endl;
            return;
        }
        std::cout << "Server running on http://localhost:" << PORT << std::endl;

        // 保持伺服器運行
        while (true) {
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }

        MHD_stop_daemon(daemon);
        serverRunning = true;
    };
}



ClientHandler *g_handler = 0;

std::string GetApplicationDir()
{
	HMODULE hModule = GetModuleHandleW(NULL);
	WCHAR wpath[MAX_PATH];

	GetModuleFileNameW(hModule, wpath, MAX_PATH);
	std::wstring wide(wpath);

	std::string path = CefString(wide);
	path = path.substr(0, path.find_last_of("\\/"));
	return path;
}

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
	switch (uMsg) {
	case WM_DESTROY:
		CefQuitMessageLoop();
		PostQuitMessage(0);
		return 0;

	case WM_SIZE:
		if (g_handler) {
			// Resize the browser window and address bar to match
			//  the new frame
			// window size
			RECT rect;
			GetClientRect(hwnd, &rect);
			HDWP hdwp = BeginDeferWindowPos(1);
			hdwp = DeferWindowPos(hdwp, g_handler->GetBrowserHwnd(),
			                      NULL, rect.left, rect.top,
			                      rect.right - rect.left,
			                      rect.bottom - rect.top,
			                      SWP_NOZORDER);
			EndDeferWindowPos(hdwp);
		}

		break;

	case WM_ERASEBKGND:
		if (g_handler) {
			// Dont erase the background if the browser window has
			//  been loaded
			// (this avoids flashing)
			return 0;
		}

		break;

	case WM_PAINT:
		PAINTSTRUCT ps;
		HDC hdc = BeginPaint(hwnd, &ps);
		EndPaint(hwnd, &ps);
		return 0;
	}

	return DefWindowProc(hwnd, uMsg, wParam, lParam);
}

HWND RegisterWindow(HINSTANCE hInstance, int nCmdShow)
{
	WNDCLASS wc = {};

	wc.lpfnWndProc   = WindowProc;
	wc.hInstance     = hInstance;
	wc.lpszClassName = "TestsDatabaseWindow";
	RegisterClass(&wc);
	HWND hwnd = CreateWindowEx(0,                                 // Optional
	                                                              //  window
	                                                              //  styles.
	                           "TestsDatabaseWindow", // Window class
	                           "Daily Story", // Window text
	                           WS_OVERLAPPEDWINDOW | WS_CLIPCHILDREN, // Window
	                                                                  //  style
	                           // Size and position
	                           CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT,
	                           CW_USEDEFAULT,
	                           NULL, // Parent window
	                           NULL, // Menu
	                           hInstance, // Instance handle
	                           NULL // Additional application data
	                           );

	if (hwnd == NULL) {
		return 0;
	}

	ShowWindow(hwnd, nCmdShow);
	return hwnd;
}

LRESULT CALLBACK MessageWndProc(HWND hWnd, UINT message, WPARAM wParam,
                                LPARAM lParam)
{
	return DefWindowProc(hWnd, message, wParam, lParam);
}

HWND CreateMessageWindow(HINSTANCE hInstance)
{
	WNDCLASSEX wc = {
		0
	};

	wc.cbSize        = sizeof(wc);
	wc.lpfnWndProc   = MessageWndProc;
	wc.hInstance     = hInstance;
	wc.lpszClassName = "ClientMessageWindow";
	RegisterClassEx(&wc);
	return CreateWindow("ClientMessageWindow", 0, 0, 0, 0, 0, 0,
	                    HWND_MESSAGE, 0, hInstance, 0);
}


int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE, LPSTR, int nCmdShow)
{
    // 在背景執行緒中啟動伺服器
    std::thread server_thread(start_server);

	CefMainArgs main_args(hInstance);

	CefRefPtr<ClientApp> app(new ClientApp);

	// Execute the secondary process, if any.
	int exit_code = CefExecuteProcess(main_args, app.get(), NULL);

	if (exit_code >= 0) {
		exit(exit_code);
	}

	// Register the window class.
	HWND hwnd = RegisterWindow(hInstance, nCmdShow);
	if (hwnd == 0) {
		return 0;
	}

	RECT rect;
	GetClientRect(hwnd, &rect);

	// 轉換為 CefRect
	CefRect cef_rect(rect.left, rect.top,
										rect.right - rect.left,
										rect.bottom - rect.top);

	CefSettings settings;
	settings.no_sandbox = true;
	CefInitialize(main_args, settings, app.get(), NULL);
	CefWindowInfo info;
	CefBrowserSettings b_settings;
	CefRefPtr<CefClient> client(new ClientHandler);
	g_handler = (ClientHandler*) client.get();
	// std::string path         = "file://" + GetApplicationDir() +
	//                            "/dist/index.html";
	std::string path = "http://localhost:" + std::to_string(PORT) + "/";
	if (devMode){
        path = "http://localhost:5173/";
	}
	CefRefPtr<CefCommandLine> command_line =
		CefCommandLine::GetGlobalCommandLine();

	if (command_line->HasSwitch("url")) {
		path = command_line->GetSwitchValue("url");
	}

	// command_line->AppendSwitch("allow-running-insecure-content");
	// command_line->AppendSwitch("enable-media-stream");
	// command_line->AppendSwitch("disable-web-security");
	// command_line->AppendSwitch("enable-local-file-accesses");

	info.SetAsChild(hwnd, cef_rect);
	CefBrowserHost::CreateBrowser(info,
	                              client.get(), path, b_settings, nullptr,
	                              nullptr);
	int result = 0;

	if (!settings.multi_threaded_message_loop) {
		// Run the CEF message loop. This function will block until the
		//  application
		// recieves a WM_QUIT message.
		CefRunMessageLoop();
	} else {
		// Create a hidden window for message processing.
		HWND hMessageWnd = CreateMessageWindow(hInstance);
		MSG msg;

		// Run the application message loop.
		while (GetMessage(&msg, NULL, 0, 0)) {
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}

		DestroyWindow(hMessageWnd);
		hMessageWnd = NULL;
		result      = static_cast<int>(msg.wParam);
	}

	CefShutdown();
	return result;
}
