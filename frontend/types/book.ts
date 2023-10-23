export interface Book {
  id: number;
  title: string;
  status: "to-read" | "in-progress" | "completed";
}
