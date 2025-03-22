#ifndef JS_BINDING_H
#define JS_BINDING_H

#include <include/cef_v8.h>

// 處理 JavaScript 調用的 V8 綁定處理類
class JsBindingHandler : public CefV8Handler {
public:
    JsBindingHandler();

    // CefV8Handler 實作 - 處理 JavaScript 調用
    virtual bool Execute(const CefString& name,
                        CefRefPtr<CefV8Value> object,
                        const CefV8ValueList& arguments,
                        CefRefPtr<CefV8Value>& retval,
                        CefString& exception) override;

private:
    IMPLEMENT_REFCOUNTING(JsBindingHandler);
    DISALLOW_COPY_AND_ASSIGN(JsBindingHandler);
};

// 用於註冊 JavaScript 綁定的類
class JsBinding {
public:
    // 在指定 context 中註冊 JavaScript 函數
    static void RegisterJsBindings(CefRefPtr<CefV8Context> context);
};

#endif // JS_BINDING_H
