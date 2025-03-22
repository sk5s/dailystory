#include "app.hpp"
#include <string>
#include <include/cef_browser.h>
#include <include/views/cef_browser_view.h>
#include <include/views/cef_window.h>
#include <include/wrapper/cef_helpers.h>
#include <windows.h>
#include <shlwapi.h>

MyCefApp::MyCefApp() {
}

void MyCefApp::OnContextInitialized() {
    CEF_REQUIRE_UI_THREAD();

    // 建立主視窗
    CreateMainWindow();
}

void MyCefApp::CreateMainWindow() {
    // 設定視窗資訊
    CefWindowInfo window_info;

#ifdef _WIN32
    // Set the window style to make it look like a native GUI
    window_info.SetAsPopup(NULL, "React CEF Application");
    // window_info.style = WS_SYSMENU | WS_POPUP | WS_CLIPCHILDREN | WS_CLIPSIBLINGS | WS_VISIBLE;
    // window_info.parent_window = nullptr; // Or nullptr for standalone
#endif

    // 瀏覽器設定
    CefBrowserSettings browser_settings;

    // 初始 URL - 本地 React 應用
    // Get the current executable directory
    char exePath[MAX_PATH];
    GetModuleFileName(NULL, exePath, MAX_PATH);
    PathRemoveFileSpec(exePath);  // Remove the executable file name

    // Build the full path to the React app's index.html
    std::string url = "file:///" + std::string(exePath) + "\\dist\\index.html";

    // 建立客戶端處理器
    CefRefPtr<ClientHandler> client_handler(new ClientHandler());

    // 建立瀏覽器視窗
    CefBrowserHost::CreateBrowser(
        window_info,
        client_handler,
        url,
        browser_settings,
        nullptr,
        nullptr
    );
}
