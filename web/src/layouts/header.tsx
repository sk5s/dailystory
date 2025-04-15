import { useAccountContext } from "@/components/features/account/AccountContext"
import Accounts from "@/components/features/account/Accounts"
import NowAccount from "@/components/features/account/NowAccount"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useCallback, useRef } from "react"
import { Link } from "react-router"

const Header = () => {
  const { selectedUser, setSelectedUser } = useAccountContext();

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    // Ignore this event unless it's a strictly vertical wheel event (horizontal wheel events are already handled by the library)
    if (!viewportRef.current || e.deltaY === 0 || e.deltaX !== 0) {
      return;
    }

    // Capture up/down wheel events and scroll the viewport horizontally
    const delta = e.deltaY;
    const currPos = viewportRef.current.scrollLeft;
    const scrollWidth = viewportRef.current.scrollWidth;

    const newPos = Math.max(0, Math.min(scrollWidth, currPos + delta));

    viewportRef.current.scrollLeft = newPos;
  }, []);

  const DefaultContentLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <div className="grid gap-2 p-2 md:w-[200px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]">
        {children}
      </div>
    )
  }
  return (
    <div className="flex flex-row mx-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NowAccount />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <DefaultContentLayout>
                <div className="w-full">
                  <h3 className="mb-2">切換使用者</h3>
                  <ScrollArea className="md:w-[190px] lg:w-[290px] whitespace-nowrap pb-4" ref={viewportRef} onWheel={onWheel}>
                    <div className="flex flex-row gap-4">
                      <Accounts selectedUser={selectedUser} onAccountSelect={(username) => {
                        setSelectedUser(username);
                      }} />
                      <Link to="/user">
                        <Button className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300">
                          <span className="text-gray-600 font-bold text-xl w-8">+</span>
                        </Button>
                      </Link>
                    </div>
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
                <NavigationMenuLink href="#/">查看日記</NavigationMenuLink>
                <NavigationMenuLink href="#/calendar">查看月曆</NavigationMenuLink>
              </DefaultContentLayout>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>關於</NavigationMenuTrigger>
            <NavigationMenuContent>
              <DefaultContentLayout>
                <NavigationMenuLink href="#/settings">設定</NavigationMenuLink>
                <NavigationMenuLink>檢查更新</NavigationMenuLink>
                <NavigationMenuLink>說明</NavigationMenuLink>
              </DefaultContentLayout>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="w-full flex flex-row justify-end">
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header