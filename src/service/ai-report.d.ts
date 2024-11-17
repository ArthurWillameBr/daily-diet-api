export interface AiReportService {
  generateDietReport(data: {
    meals: {
      dateTime: string;
      name: string;
      description: string;
      isOnDiet: boolean;
    }[];
  }): Promise<string>;
}
