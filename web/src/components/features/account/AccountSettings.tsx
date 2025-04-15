import { useBackend } from "@/BackendContext";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { useAccountContext } from "./AccountContext";
import { MdEditor } from "../editor/Editor";
import { toast } from "sonner";
import { DateNavigator } from "@/components/features/calendar/DateNavigator";

function AccountSettings() {
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
    if (!selectedUser || !diaryContent) {
      toast.error('請輸入日記內容');
      return;
    }
    const result = saveDiary(selectedUser, selectedDate, diaryContent);
    console.log("Saving dairy", result);
    if (result === 'success'){
      toast.success("已儲存！");
      updateUserList();
      setUnsaved(false);
    }
  }, [isReady, selectedUser, diaryContent, saveDiary, selectedDate, updateUserList, setUnsaved]);

  // 切換使用者並載入日記
  const handleSwitchUser = (user: string) => {
    if (!isReady) {
      toast.error('後端尚未準備好，請稍候');
      return;
    }
    setDisabled(true);
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
      {/* 日記內容 */}
      <div style={{ marginTop: "20px" }}>
        {!!selectedUser && (
          <MdEditor disabled={disabled} markdown={diaryContent} setMarkdown={(mdtext) => {
            if (!unsaved) setUnsaved(true);
            setDiaryContent(mdtext);
          }} />
        )}
      </div>

      <div className="flex justify-between items-end gap-4">
        <DateNavigator />
        {/* 儲存按鈕 */}
        <Button disabled={disabled} onClick={handleSaveDiary} className="mt-3">
          儲存日記
        </Button>
      </div>
    </div>
  );
}

export default AccountSettings;
