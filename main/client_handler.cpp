#include "client_handler.hpp"
#include <include/wrapper/cef_helpers.h>
#include <include/cef_app.h>
#include <include/cef_parser.h>
#include <sstream>
#include <string>

#ifdef _WIN32
#include <windows.h>
#endif

ClientHandler::ClientHandler()
    : is_closing_(false) {
}

ClientHandler::~ClientHandler() {
}

void ClientHandler::OnAfterCreated(CefRefPtr<CefBrowser> browser) {
    CEF_REQUIRE_UI_THREAD();

    // 儲存瀏覽器參考
    browser_ = browser;
}

bool ClientHandler::DoClose(CefRefPtr<CefBrowser> browser) {
    CEF_REQUIRE_UI_THREAD();

    // 設定關閉標記
    is_closing_ = true;

    // 允許關閉
    return false;
}

void ClientHandler::OnBeforeClose(CefRefPtr<CefBrowser> browser) {
    CEF_REQUIRE_UI_THREAD();

    // 釋放瀏覽器參考
    browser_ = nullptr;

    // 退出訊息迴圈
    CefQuitMessageLoop();
}

void ClientHandler::OnTitleChange(CefRefPtr<CefBrowser> browser, const CefString& title) {
    CEF_REQUIRE_UI_THREAD();

#ifdef _WIN32
    // 在 Windows 上設置視窗標題
    CefWindowHandle hwnd = browser->GetHost()->GetWindowHandle();
    if (hwnd) {
        SetWindowTextW(hwnd, std::wstring(title).c_str());
    }
#endif
}

void ClientHandler::OnLoadError(CefRefPtr<CefBrowser> browser,
                              CefRefPtr<CefFrame> frame,
                              ErrorCode errorCode,
                              const CefString& errorText,
                              const CefString& failedUrl) {
    CEF_REQUIRE_UI_THREAD();


}

bool ClientHandler::OnProcessMessageReceived(
    CefRefPtr<CefBrowser> browser,
    CefRefPtr<CefFrame> frame,
    CefProcessId source_process,
    CefRefPtr<CefProcessMessage> message) {

    CEF_REQUIRE_UI_THREAD();

    // 處理從 JavaScript 發送的訊息
    std::string message_name = message->GetName();

    if (message_name == "jsToNative") {
        // 取得參數
        CefRefPtr<CefListValue> args = message->GetArgumentList();
        if (args->GetSize() > 0 && args->GetType(0) == VTYPE_STRING) {
            std::string json_data = args->GetString(0);

            // 處理來自 JavaScript 的數據
            // TODO: 實現你的業務邏輯

            // 回傳數據給 JavaScript
            CefRefPtr<CefProcessMessage> response = CefProcessMessage::Create("nativeToJs");
            CefRefPtr<CefListValue> response_args = response->GetArgumentList();
            response_args->SetString(0, "已在 C++ 端處理數據");
            frame->SendProcessMessage(PID_RENDERER, response);

            return true;
        }
    }

    return false;
}
