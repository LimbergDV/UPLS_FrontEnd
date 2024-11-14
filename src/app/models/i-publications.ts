export interface IPublications {
  id_donee: number;
  title: string;
  description: string;
  image: string;
  date_limit: Date;
  blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  donors_number?: number;
  comments?: string[];
}
