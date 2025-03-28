#include <iostream>
#include <filesystem>
#include <fstream>
#include <curl/curl.h>
#include <sstream>

namespace fs = std::filesystem;

// 下載時的回呼函式，負責寫入檔案
size_t WriteCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    std::ostream* os = static_cast<std::ostream*>(userp);
    size_t totalSize = size * nmemb;
    os->write(static_cast<char*>(contents), totalSize);
    return totalSize;
}

bool downloadAvatar(const std::string& username) {
    CURL* curl;
    CURLcode res;

    std::string filename = "images/" + username + ".svg";
    std::string folderpath = fs::path(filename).parent_path().string();

    // 確保目錄存在
    if (!fs::exists(folderpath)) {
        fs::create_directories(folderpath);
    }

    std::ofstream file(filename, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "Could not open file to write: " << filename << std::endl;
        return false;
    }

    curl = curl_easy_init();
    if (curl) {
        // 轉換 username 為合法 URL
        char* encodedUsername = curl_easy_escape(curl, username.c_str(), username.length());
        std::ostringstream url;
        url << "https://ui-avatars.com/api/?name=" << encodedUsername << "&background=random";
        curl_free(encodedUsername);

        curl_easy_setopt(curl, CURLOPT_URL, url.str().c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &file);

        // 新增錯誤處理
        res = curl_easy_perform(curl);
        if (res != CURLE_OK) {
            std::cerr << "cURL error: " << curl_easy_strerror(res) << std::endl;
            file.close();
            curl_easy_cleanup(curl);
            return false;
        }

        // 確認 HTTP 回應碼
        long http_code = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &http_code);
        if (http_code != 200) {
            std::cerr << "HTTP error: " << http_code << std::endl;
            file.close();
            curl_easy_cleanup(curl);
            return false;
        }

        curl_easy_cleanup(curl);
    } else {
        std::cerr << "Failed to initialize cURL" << std::endl;
        file.close();
        return false;
    }

    file.close();
    return true;
}