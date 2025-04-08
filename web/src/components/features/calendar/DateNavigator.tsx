import { Button } from "@/components/ui/button"
import { DatePicker } from "./DatePicker"
import { IconLeft, IconRight } from "react-day-picker"
import { useAccountContext } from "../account/AccountContext"
import { formatDate } from "@/lib/utils"

export const DateNavigator = () => {
  const { selectedDate, setSelectedDate, unsaved } = useAccountContext();
  const handleDateMove = (direction: number) => {
    if (unsaved) {
      const ans = confirm("有未儲存的筆記，是否捨棄草稿？");
      if (!ans){
        return
      } else {
        console.log("直接覆蓋")
      }
    }
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + direction);
    setSelectedDate(formatDate(date));
  };
  return (
    <div className="flex flex-row gap-2">
      <Button variant="outline" onClick={() => {handleDateMove(-1)}}>
        <IconLeft />
        前一天
      </Button>
      <DatePicker />
      <Button variant="outline" onClick={() => {handleDateMove(1)}}>
        後一天
        <IconRight />
      </Button>
    </div>
  )
}
