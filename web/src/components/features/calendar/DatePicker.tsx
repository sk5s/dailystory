import { CalendarIcon } from "lucide-react"
import { DateSelectCalendar } from "./DateSelectCalendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAccountContext } from "../account/AccountContext"
import { cn } from "@/lib/utils"
import { useState } from "react"

export const DatePicker = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { selectedDate } = useAccountContext();
  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {selectedDate ? selectedDate.split("-").join(" / ") : <span>選擇日期</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DateSelectCalendar onSelect={() => {
          setCalendarOpen(false)
        }} />
      </PopoverContent>
    </Popover>
  )
}
