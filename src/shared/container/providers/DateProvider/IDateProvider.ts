interface IDateProvider {
  compareInHours(dateNow: string, dateToCompare: string): number;
  convertToUTC(date: Date): string;
}

export default IDateProvider;
