import { useAccountContext } from "@/components/features/account/AccountContext"
import Accounts from "@/components/features/account/Accounts"
import NowAccount from "@/components/features/account/NowAccount"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const Header = () => {
  const { selectedUser, setSelectedUser } = useAccountContext();
  const DefaultContentLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <div className="grid gap-2 p-2 md:w-[200px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]">
        {children}
      </div>
    )
  }
  return (
    <NavigationMenu className="mx-8">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <NowAccount />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <DefaultContentLayout>
              <div className="w-full">
                <h3>切換帳號</h3>
                <ScrollArea className="md:w-[190px] lg:w-[290px] whitespace-nowrap pb-4">
                  <Accounts selectedUser={selectedUser} onAccountSelect={(username) => {
                    setSelectedUser(username);
                    console.log(username)
                  }} />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </DefaultContentLayout>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>檔案</NavigationMenuTrigger>
          <NavigationMenuContent>
            <DefaultContentLayout>
              <NavigationMenuLink>查看月曆</NavigationMenuLink>
            </DefaultContentLayout>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>關於</NavigationMenuTrigger>
          <NavigationMenuContent>
            <DefaultContentLayout>
              <NavigationMenuLink>檢查更新</NavigationMenuLink>
              <NavigationMenuLink>說明</NavigationMenuLink>
            </DefaultContentLayout>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Header