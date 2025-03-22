#include <iostream>
#include "app.h"

#ifdef _WIN32
#include <windows.h>

// Windows 平台的入口點
int APIENTRY WinMain(HINSTANCE hInstance,
                      HINSTANCE hPrevInstance,
                      LPTSTR    lpCmdLine,
                      int       nCmdShow) {
    // 啟用高 DPI 支援
    CefEnableHighDPISupport();

    // 提供 CEF 命令列參數
    CefMainArgs main_args(hInstance);
#else
// Linux/Mac 平台的入口點
int main(int argc, char* argv[]) {
    // 提供 CEF 命令列參數
    CefMainArgs main_args(argc, argv);
#endif

    // 實例化自定義 App 處理器
    CefRefPtr<MyCefApp> app(new MyCefApp());

    // 執行 CEF 子進程，如有需要
    int exit_code = CefExecuteProcess(main_args, app.get(), nullptr);
    if (exit_code >= 0) {
        return exit_code;
    }

    // 設定 CEF 設定
    CefSettings settings;
    settings.no_sandbox = true;
    
    // 設定視窗渲染為原生控制項以減少閃爍
    settings.windowless_rendering_enabled = false;

    // 初始化 CEF
    CefInitialize(main_args, settings, app.get(), nullptr);

    // 運行 CEF 訊息迴圈
    CefRunMessageLoop();

    // 關閉 CEF
    CefShutdown();

    return 0;
}