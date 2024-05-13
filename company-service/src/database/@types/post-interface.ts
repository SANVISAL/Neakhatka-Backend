
export interface IpostDocument {
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[]; 
  people: number;
  location: string;
  duration: number;
  gender: "male" | "female" | "other";
  type: "full-time" | "part-time";
  available_position: number;
  language: string[];
  deadline: Date;
  salaries: number[];
  createdAt: Date;
}
