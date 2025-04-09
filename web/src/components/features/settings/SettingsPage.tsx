import DefaultLayout from "@/layouts/DefaultLayout"
import { ThemeSwitcher } from '@/components/ui/kibo-ui/theme-switcher';
import { useTheme } from "@/components/ui/theme-provider";

export const SettingsPage = () => {
  const { theme, setTheme } = useTheme()
  return (
    <DefaultLayout>
      <h1 className='text-2xl font-bold my-4'>設定</h1>
      <div className="flex flex-row gap-2 items-center">
        <h2>佈景主題</h2>
        <div>
          <ThemeSwitcher defaultValue="system" value={theme} onChange={(e) => setTheme(e)} />
        </div>
      </div>
    </DefaultLayout>
  )
}
