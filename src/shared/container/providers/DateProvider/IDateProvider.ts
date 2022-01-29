interface IDateProvider {
  compareInHours(dateNow: string, dateToCompare: string): number;
  convertToUTC(date: Date): string;
  compareInDays(startDate: Date, endDate: Date): number;
  addDays(days: number): Date;
}

export default IDateProvider;
