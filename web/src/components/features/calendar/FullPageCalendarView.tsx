import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
} from '@/components/ui/kibo-ui/calendar';
import { exampleFeatures } from '@/lib/content';

export const FullPageCalendarView = () => {
  const earliestYear =
    exampleFeatures
      .map((feature) => feature.startAt.getFullYear())
      .sort()
      .at(0) ?? new Date().getFullYear();

  const latestYear =
    exampleFeatures
      .map((feature) => feature.endAt.getFullYear())
      .sort()
      .at(-1) ?? new Date().getFullYear();

  return (
    <div className='h-full'>
      <CalendarProvider locale="zh-TW">
        <CalendarDate>
          <CalendarDatePicker>
            <CalendarMonthPicker />
            <CalendarYearPicker start={earliestYear} end={latestYear} />
          </CalendarDatePicker>
          <CalendarDatePagination />
        </CalendarDate>
        <CalendarHeader />
        <CalendarBody features={exampleFeatures}>
          {({ feature }) => <CalendarItem key={feature.id} feature={feature} />}
        </CalendarBody>
      </CalendarProvider>
    </div>
  )
}
