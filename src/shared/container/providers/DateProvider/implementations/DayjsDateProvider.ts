import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(dateNow: string, dateToCompare: string): number {
    const compare = dayjs(dateToCompare).diff(dateNow, "hours");

    return compare;
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const compare = dayjs(endDate).diff(startDate, "days");

    return compare;
  }
}

export default DayjsDateProvider;
