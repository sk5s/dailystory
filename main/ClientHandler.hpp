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

#ifndef __CEFSimpleSample__ClientHandler__
#define __CEFSimpleSample__ClientHandler__

#include "include/cef_render_process_handler.h"
#include "include/cef_client.h"
#include "include/cef_v8.h"
#include "include/cef_browser.h"
#include "include/cef_life_span_handler.h"

#include "BrowserHandler.hpp"

class ClientHandler : public CefClient, public CefLifeSpanHandler
{
public:
  ClientHandler();

  CefRefPtr<CefBrowser> GetBrowser()
  {
    return m_Browser;
  }

  CefWindowHandle GetBrowserHwnd()
  {
    return m_BrowserHandle;
  }

  // CefClient methods
  virtual CefRefPtr<CefLifeSpanHandler> GetLifeSpanHandler() override
  {
    return this;
  }

  // Virtual on CefLifeSpanHandler
  virtual bool DoClose(CefRefPtr<CefBrowser> browser) override;
  virtual bool OnBeforePopup(CefRefPtr<CefBrowser> browser,
    CefRefPtr<CefFrame> frame,
    int popup_id,
    const CefString& target_url,
    const CefString& target_frame_name,
    CefLifeSpanHandler::WindowOpenDisposition target_disposition,
    bool user_gesture,
    const CefPopupFeatures& popupFeatures,
    CefWindowInfo& windowInfo,
    CefRefPtr<CefClient>& client,
    CefBrowserSettings& settings,
    CefRefPtr<CefDictionaryValue>& extra_info,
    bool* no_javascript_access) override;
  virtual void OnAfterCreated(CefRefPtr<CefBrowser> browser) override;
  virtual void OnBeforeClose(CefRefPtr<CefBrowser> browser) override;

  CefRefPtr<CefContextMenuHandler> GetContextMenuHandler() override {  // 修正為 CefContextMenuHandler
    return new BrowserHandler();
  }

protected:
  // The child browser window
  CefRefPtr<CefBrowser> m_Browser;

  // The child browser window handle
  CefWindowHandle m_BrowserHandle;

  // /
  // Macro that provides a reference counting implementation for classes
  // extending CefBase.
  // /
  IMPLEMENT_REFCOUNTING(ClientHandler);
};

#endif /* defined(__CEFSimpleSample__ClientHandler__) */
