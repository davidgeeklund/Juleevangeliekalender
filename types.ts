export interface DayContent {
  day: number;
  verseReference: string;
  verseText: string;
  encouragement: string;
}

export interface CalendarState {
  openedDoors: number[];
  cachedContent: Record<number, DayContent>;
}