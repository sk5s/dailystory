import { useBackend } from "@/BackendContext";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { useAccountContext } from "./AccountContext";
import { MdEditor } from "../editor/Editor";
import { toast } from "sonner";

function AccountSettings() {
  const [username, setUsername] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { selectedUser, updateUserList, selectedDate, unsaved, setUnsaved } = useAccountContext();

  const { saveDiary, loadDiary, isReady } = useBackend();

  // 處理儲存日記
  const handleSaveDiary = useCallback(() => {
    if (!isReady) {
      toast.error('後端尚未準備好，請稍候');
      return;
    }
    if (!username || !diaryContent) {
      toast.error('請輸入名字和日記內容');
      return;
    }
    const result = saveDiary(username, selectedDate, diaryContent);
    console.log("Saving dairy", result);
    if (result === 'success'){
      toast.success("已儲存！");
      updateUserList();
      setUnsaved(false);
    }
  }, [isReady, username, diaryContent, saveDiary, selectedDate, updateUserList, setUnsaved]);

  // 切換帳號並載入日記
  const handleSwitchUser = (user: string) => {
    if (!isReady) {
      toast.error('後端尚未準備好，請稍候');
      return;
    }
    setDisabled(true);
    setUsername(user);
    handleRefresh(user);
  };

  const handleRefresh = useCallback(
    (user: string) => {
      setDisabled(true);
      setUnsaved(false);
      console.log("Getting file content...");
      const content = loadDiary(user, selectedDate);
      setDiaryContent(content);
      setTimeout(() => {
        setDisabled(false);
      }, 200);
    },
    [loadDiary, selectedDate, setUnsaved]
  );

  useEffect(() => {
    if (selectedUser){
      handleSwitchUser(selectedUser)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser])

  useEffect(() => {
    if (selectedUser){
      handleRefresh(selectedUser)
    }
  }, [handleRefresh, selectedDate, selectedUser])

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
        {/* <label>日記內容: </label><br/>
        <textarea
          value={diaryContent}
          onChange={(e) => setDiaryContent(e.target.value)}
          rows={10}
          cols={50}
          placeholder="寫下你的日記..."
        /> */}
        {!!selectedUser && (
          <MdEditor disabled={disabled} markdown={diaryContent} setMarkdown={(mdtext) => {
            if (!unsaved) setUnsaved(true);
            setDiaryContent(mdtext);
          }} />
        )}
      </div>

      {/* 儲存按鈕 */}
      <Button disabled={disabled} onClick={handleSaveDiary} className="mt-3">
        儲存日記
      </Button>

      {/* 帳號列表 */}
      {/* <div className="mt-5">
        <h3>切換帳號</h3>
        <div className="border rounded p-4">
          <ScrollArea className="">
            <Accounts selectedUser={selectedUser} onAccountSelect={(username) => handleSwitchUser(username)} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div> */}
    </div>
  );
}

export default AccountSettings;
