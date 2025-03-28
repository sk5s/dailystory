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

#include "ClientV8ExtensionHandler.hpp"

#include <fstream>
#include <string>
#include <filesystem>
#include <vector>
#include <iostream>

#include "utils.hpp"

namespace fs = std::filesystem;

ClientV8ExtensionHandler::ClientV8ExtensionHandler(CefRefPtr<CefApp> app)
{
  this->app = app;
}

bool ClientV8ExtensionHandler::Execute(const CefString &name,
                                       CefRefPtr<CefV8Value> object,
                                       const CefV8ValueList &arguments,
                                       CefRefPtr<CefV8Value> &retval,
                                       CefString &exception)
{
  if (name == "ChangeTextInJS")
  {
    if ((arguments.size() == 1) && arguments[0]->IsString())
    {
      CefString text = arguments[0]->GetStringValue();
      CefRefPtr<CefFrame> frame =
          CefV8Context::GetCurrentContext()->GetBrowser()->GetMainFrame();
      std::string jscall = "ChangeText('";
      jscall += text;
      jscall += "');";
      frame->ExecuteJavaScript(jscall, frame->GetURL(), 0);
      /*
       * If you want your method to return a value, just use
       *  retval, like this:
       * retval = CefV8Value::CreateString("Hello World!");
       * you can use any CefV8Value, what means you can return
       *  arrays, objects or whatever you can create with
       *  CefV8Value::Create* methods
       */
      return true;
    }
  }

  // 儲存日記
  if (name == "saveDiary") {
    if (arguments.size() == 2 && arguments[0]->IsString() && arguments[1]->IsString()) {
      std::string username = arguments[0]->GetStringValue().ToString();
      std::string content = arguments[1]->GetStringValue().ToString();

      std::string dir = "diaries";
      if (!fs::exists(dir)) {
        fs::create_directory(dir);
      }

      std::string filename = dir + "/" + username + ".txt";
      std::ofstream outFile(filename, std::ios::out);
      if (outFile.is_open()) {
        outFile << content;
        outFile.close();
        retval = CefV8Value::CreateString("success");
      } else {
        exception = "failed";
      }
      return true;
    } else {
      exception = "參數無效";
    }
  }

  // 載入日記
  if (name == "loadDiary") {
    if (arguments.size() == 1 && arguments[0]->IsString()) {
      std::string username = arguments[0]->GetStringValue().ToString();
      std::string filename = "diaries/" + username + ".txt";

      std::ifstream inFile(filename);
      if (inFile.is_open()) {
        std::string content((std::istreambuf_iterator<char>(inFile)),
                            std::istreambuf_iterator<char>());
        inFile.close();
        retval = CefV8Value::CreateString(content);
      } else {
        retval = CefV8Value::CreateString("");
      }
      return true;
    } else {
      exception = "參數無效";
    }
  }

  // 獲取帳號列表
  if (name == "getUserList") {
    std::vector<std::string> userList;
    std::string dir = "diaries";
    if (fs::exists(dir)) {
      for (const auto& entry : fs::directory_iterator(dir)) {
        std::string filename = entry.path().filename().string();
        if (filename.ends_with(".txt")) {
          std::string username = filename.substr(0, filename.size() - 4);
          userList.push_back(username);
        }
      }
    }

    CefRefPtr<CefV8Value> array = CefV8Value::CreateArray(userList.size());
    for (size_t i = 0; i < userList.size(); ++i) {
      array->SetValue(i, CefV8Value::CreateString(userList[i]));
    }
    retval = array;
    return true;
  }

  if (name == "addUser") {
    if (arguments.size() == 1 && arguments[0]->IsString()) {
      if (downloadAvatar(arguments[0]->GetStringValue().ToString())) {
          std::cout << "Avatar downloaded successfully." << std::endl;
      } else {
          std::cout << "Failed to download avatar." << std::endl;
      }
    }
  }

  return false;
}
