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

#include "ClientHandler.hpp"

#include "include/cef_app.h"
#include "include/cef_base.h"
#include "include/cef_client.h"
#include "include/cef_command_line.h"
#include "include/cef_frame.h"
#include "include/cef_browser_process_handler.h"

#include <iostream>
#include <windows.h>

ClientHandler::ClientHandler()
{
  std::cout << "[DEBUG] ClientHandler created!" << std::endl;
}

bool ClientHandler::DoClose(CefRefPtr<CefBrowser> browser)
{
  return false;
}

void ClientHandler::OnAfterCreated(CefRefPtr<CefBrowser> browser)
{
  if (!m_Browser.get())
  {
    // We need to keep the main child window, but not popup windows
    m_Browser = browser;
    m_BrowserHandle = browser->GetHost()->GetWindowHandle();
  }
}

bool ClientHandler::OnBeforePopup(CefRefPtr<CefBrowser> browser,
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
  bool* no_javascript_access) {
    std::cout << "[DEBUG] OnBeforePopup triggered!" << std::endl;
    std::cout << "Popup ID: " << popup_id << std::endl;
    std::cout << "URL: " << target_url.ToString() << std::endl;

    // Open the URL in the system's default browser
    std::wstring url = target_url.ToWString();
    ShellExecuteW(NULL, L"open", url.c_str(), NULL, NULL, SW_SHOWNORMAL);
    return true;
}

void ClientHandler::OnBeforeClose(CefRefPtr<CefBrowser> browser)
{
  if (m_BrowserHandle == browser->GetHost()->GetWindowHandle())
  {
    // Free the browser pointer so that the browser can be destroyed
    m_Browser = nullptr;
  }
}
