import { useBackend } from "@/BackendContext";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

function AccountSettings() {
  const [username, setUsername] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState("");

  const { saveDiary, loadDiary, getUserList, isReady } = useBackend();

  const updateUserList = useCallback(() => {
    const users = getUserList();
    setUsers(users);
    console.log(users);
  }, [getUserList]);

  // 載入現有帳號
  useEffect(() => {
    if (isReady) {
      updateUserList();
    }
  }, [isReady, updateUserList]);

  // 處理儲存日記
  const handleSaveDiary = () => {
    if (!isReady) {
      alert('後端尚未準備好，請稍候');
      return;
    }
    if (!username || !diaryContent) {
      alert('請輸入名字和日記內容');
      return;
    }
    const result = saveDiary(username, diaryContent);
    console.log("Saving dairy", result);
    if (result === 'success'){
      alert("已儲存！");
      updateUserList();
    }
  };

  // 切換帳號並載入日記
  const handleSwitchUser = (user: string) => {
    if (!isReady) {
      alert('後端尚未準備好，請稍候');
      return;
    }
    setSelectedUser(user);
    setUsername(user);
    const content = loadDiary(user);
    setDiaryContent(content);
  };

  return (
    <div>
      {/* 輸入名字 */}
      <div>
        <label>使用者名稱: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="輸入你的名字"
        />
      </div>

      {/* 日記內容 */}
      <div style={{ marginTop: "20px" }}>
        <label>日記內容: </label><br/>
        <textarea
          value={diaryContent}
          onChange={(e) => setDiaryContent(e.target.value)}
          rows={10}
          cols={50}
          placeholder="寫下你的日記..."
        />
      </div>

      {/* 儲存按鈕 */}
      <Button onClick={handleSaveDiary} className="mt-3">
        儲存日記
      </Button>

      {/* 帳號列表 */}
      <div className="mt-5">
        <h3>切換帳號</h3>
        <div className="border rounded p-4">
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li
                  key={user}
                  onClick={() => handleSwitchUser(user)}
                  style={{
                    cursor: "pointer",
                    fontWeight: user === selectedUser ? "bold" : "normal",
                  }}
                >
                  {user}
                </li>
              ))}
            </ul>
          ) : (
            <p>尚未有帳號</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
