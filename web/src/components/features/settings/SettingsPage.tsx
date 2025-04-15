import DefaultLayout from "@/layouts/DefaultLayout"
import { ThemeSwitcher } from '@/components/ui/kibo-ui/theme-switcher';
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";
import { Edit2, PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { useAccountContext } from "../account/AccountContext";

export const SettingsPage = () => {
  const { theme, setTheme } = useTheme()
  const { selectedUser } = useAccountContext();
  return (
    <DefaultLayout>
      <h1 className='text-2xl font-bold my-4'>設定</h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-2 items-center">
          <h2>佈景主題</h2>
          <div>
            <ThemeSwitcher defaultValue="system" value={theme} onChange={(e) => setTheme(e)} />
          </div>
        </div>

        {selectedUser ? 
        (<Link to={`/user/${selectedUser}`}>
          <Button>
            <Edit2 />
            編輯使用者
          </Button>
        </Link>): (<Link to={`/user`}>
          <Button>
            <PlusIcon />
            新增使用者
          </Button>
        </Link>)}
      </div>
    </DefaultLayout>
  )
}
