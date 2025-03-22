#ifndef CLIENT_HANDLER_H
#define CLIENT_HANDLER_H

#include <include/cef_client.h>
#include <include/cef_render_process_handler.h>
#include <include/wrapper/cef_message_router.h>

// 用於處理瀏覽器事件和自定義 JS 回調的處理器
class ClientHandler : public CefClient,
                      public CefDisplayHandler,
                      public CefLifeSpanHandler,
                      public CefLoadHandler,
                      public CefRenderProcessHandler {
public:
    ClientHandler();
    ~ClientHandler();

    // CefClient 方法
    virtual CefRefPtr<CefDisplayHandler> GetDisplayHandler() override {
        return this;
    }

    virtual CefRefPtr<CefLifeSpanHandler> GetLifeSpanHandler() override {
        return this;
    }

    virtual CefRefPtr<CefLoadHandler> GetLoadHandler() override {
        return this;
    }

    // CefLifeSpanHandler 方法
    virtual void OnAfterCreated(CefRefPtr<CefBrowser> browser) override;
    virtual bool DoClose(CefRefPtr<CefBrowser> browser) override;
    virtual void OnBeforeClose(CefRefPtr<CefBrowser> browser) override;

    // CefDisplayHandler 方法
    virtual void OnTitleChange(CefRefPtr<CefBrowser> browser, const CefString& title) override;

    // CefLoadHandler 方法
    virtual void OnLoadError(CefRefPtr<CefBrowser> browser,
                            CefRefPtr<CefFrame> frame,
                            ErrorCode errorCode,
                            const CefString& errorText,
                            const CefString& failedUrl) override;

    virtual bool OnProcessMessageReceived(
        CefRefPtr<CefBrowser> browser,
        CefRefPtr<CefFrame> frame,
        CefProcessId source_process,
        CefRefPtr<CefProcessMessage> message) override;

private:
    // 瀏覽器實例
    CefRefPtr<CefBrowser> browser_;

    // 確保瀏覽器僅關閉一次
    bool is_closing_;

    IMPLEMENT_REFCOUNTING(ClientHandler);
    DISALLOW_COPY_AND_ASSIGN(ClientHandler);
};

#endif // CLIENT_HANDLER_H
