#ifndef BROWSER_HANDLER_HPP
#define BROWSER_HANDLER_HPP

#include "include/cef_context_menu_handler.h"

class BrowserHandler : public CefContextMenuHandler {
 public:
  BrowserHandler();

  void OnBeforeContextMenu(CefRefPtr<CefBrowser> browser,
                           CefRefPtr<CefFrame> frame,
                           CefRefPtr<CefContextMenuParams> params,
                           CefRefPtr<CefMenuModel> model) override;
  // bool OnContextMenuCommand(CefRefPtr<CefBrowser> browser,
  //                           CefRefPtr<CefFrame> frame,
  //                           CefRefPtr<CefContextMenuParams> params,
  //                           int command_id,
  //                           cef_event_flags_t event_flags) override;

  IMPLEMENT_REFCOUNTING(BrowserHandler);
};

#endif