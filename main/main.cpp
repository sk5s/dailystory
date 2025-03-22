#include <windows.h>
#include "include/cef_command_line.h"
#include "include/cef_sandbox_win.h"
#include "simple_app.hpp"

#if defined(CEF_USE_SANDBOX)
#pragma comment(lib, "cef_sandbox.lib")
#endif

// Correct signature for wWinMain.
int WINAPI wWinMain(HINSTANCE hInstance,
                    HINSTANCE hPrevInstance,
                    PWSTR pCmdLine, // Changed from LPTSTR to PWSTR
                    int nCmdShow) {
    UNREFERENCED_PARAMETER(hPrevInstance);
    UNREFERENCED_PARAMETER(pCmdLine);

    int exit_code;

#if defined(ARCH_CPU_32_BITS)
    exit_code = CefRunWinMainWithPreferredStackSize(wWinMain, hInstance, pCmdLine, nCmdShow);
    if (exit_code >= 0) {
        return exit_code;
    }
#endif

    void* sandbox_info = nullptr;

#if defined(CEF_USE_SANDBOX)
    CefScopedSandboxInfo scoped_sandbox;
    sandbox_info = scoped_sandbox.sandbox_info();
#endif

    CefMainArgs main_args(hInstance);

    exit_code = CefExecuteProcess(main_args, nullptr, sandbox_info);
    if (exit_code >= 0) {
        return exit_code;
    }

    CefRefPtr<CefCommandLine> command_line = CefCommandLine::CreateCommandLine();
    command_line->InitFromString(::GetCommandLineW());

    CefSettings settings;

#if !defined(CEF_USE_SANDBOX)
    settings.no_sandbox = true;
#endif

    CefRefPtr<SimpleApp> app = new SimpleApp;

    if (!CefInitialize(main_args, settings, app.get(), sandbox_info)) {
        return CefGetExitCode();
    }

    CefRunMessageLoop();

    CefShutdown();

    return 0;
}
