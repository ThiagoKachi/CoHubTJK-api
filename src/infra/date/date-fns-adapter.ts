import { DateComparer } from '@data/protocols/date/date-comparer';
import { GetDayOfWeek } from '@data/protocols/date/getDayOfWeek';
import { format, isSameDay, parseISO } from 'date-fns';

export class DateFnsAdapter implements GetDayOfWeek, DateComparer {
  compare(firstDate: string, secondDate: string): boolean {
    const data1Parsed = parseISO(firstDate);
    const data2Parsed = parseISO(secondDate);

    return isSameDay(data1Parsed, data2Parsed);
  }

  getDay(value: string): string {
    return format(parseISO(value), 'EEEE').toLocaleLowerCase();
  }
}
