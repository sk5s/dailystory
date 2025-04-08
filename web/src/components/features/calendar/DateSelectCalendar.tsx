import { Calendar } from "@/components/ui/calendar"
import { zhTW } from "date-fns/locale";
import { useState } from "react"
import { useAccountContext } from "../account/AccountContext";
import { formatDate } from "@/lib/utils";

type Props = {
  onSelect?: () => void;
}

export const DateSelectCalendar = ({
  onSelect
}: Props) => {
  const { selectedDate, setSelectedDate, unsaved } = useAccountContext();
  const [date1, setDate1] = useState<Date|undefined>(new Date(selectedDate));
  const handleOnSelect = (date: Date|undefined) => {
    if (unsaved) {
      const ans = confirm("有未儲存的筆記，是否捨棄草稿？");
      if (!ans){
        return
      } else {
        console.log("直接覆蓋")
      }
    }
    if (date){
      setDate1(date)
      console.log(date)
      setSelectedDate(formatDate(date))
      if (typeof onSelect === "function"){
        onSelect()
      }
    }
  }
  return (
    <div>
      <div className="flex flex-row">
        <Calendar
          mode="single"
          selected={date1}
          onSelect={handleOnSelect}
          className="rounded-md border"
          locale={zhTW}
        />
      </div>
    </div>
  )
}