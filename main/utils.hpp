#ifndef UTILS_HPP
#define UTILS_HPP

#include <string>

using namespace std;

// Downloads an avatar image for a given username
bool downloadAvatar(const std::string &username);
string sanitizeString(const string& str);
string noteSubDirPath(const string& username, const string& dateStr);

#endif // UTILS_HPP
