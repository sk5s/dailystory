#ifndef APP_H
#define APP_H

#include <include/cef_app.h>
#include <include/cef_client.h>
#include <include/cef_browser.h>
#include "client_handler.hpp"

// CEF App 實作
class MyCefApp : public CefApp,
                 public CefBrowserProcessHandler {
public:
    MyCefApp();

    // CefApp 方法
    virtual CefRefPtr<CefBrowserProcessHandler> GetBrowserProcessHandler() override {
        return this;
    }

    // CefBrowserProcessHandler 方法
    virtual void OnContextInitialized() override;

private:
    // 建立主視窗
    void CreateMainWindow();

    IMPLEMENT_REFCOUNTING(MyCefApp);
    DISALLOW_COPY_AND_ASSIGN(MyCefApp);
};

#endif // APP_H
