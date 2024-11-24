import { IComments } from "./icomments";

export interface IPublications {
  _id?: string,
  creator?: any;
  id_donee?: number;
  title: string;
  description: string;
  image: string;
  date_limit?: Date;
  blood_type: string;
  donors_number?: number;
  comments: IComments[];
  showComments?: boolean;
}
