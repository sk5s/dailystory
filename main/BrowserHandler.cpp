#include "BrowserHandler.hpp"
#include <windows.h>
#include <iostream>

#include "env.hpp"

#define IDM_CUT 1001
#define IDM_COPY 1002
#define IDM_PASTE 1003

BrowserHandler::BrowserHandler() {}

void BrowserHandler::OnBeforeContextMenu(CefRefPtr<CefBrowser> browser,
                                         CefRefPtr<CefFrame> frame,
                                         CefRefPtr<CefContextMenuParams> params,
                                         CefRefPtr<CefMenuModel> model)
{
  // TODO: Add context menu items
  if (devMode != true){
    model->Clear();
      model->AddItem(IDM_CUT, L"剪下");
      model->AddItem(IDM_COPY, L"複製");
      model->AddSeparator();
      model->AddItem(IDM_PASTE, L"貼上");

      model->SetAccelerator(IDM_CUT, 88, false, true, false);
      model->SetAccelerator(IDM_COPY, 67, false, true, false);
      model->SetAccelerator(IDM_PASTE, 86, false, true, false);

      if (params->GetEditStateFlags() & CM_EDITFLAG_CAN_CUT)
      {
        model->SetEnabled(IDM_CUT, true);
      }
      else
      {
        model->SetEnabled(IDM_CUT, false);
      }

      if (params->GetEditStateFlags() & CM_EDITFLAG_CAN_COPY)
      {
        model->SetEnabled(IDM_COPY, true);
      }
      else
      {
        model->SetEnabled(IDM_COPY, false);
      }

      if (params->GetEditStateFlags() & CM_EDITFLAG_CAN_PASTE)
      {
        model->SetEnabled(IDM_PASTE, true);
      }
      else
      {
        model->SetEnabled(IDM_PASTE, false);
      }
  }
}

