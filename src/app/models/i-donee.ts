export interface iDonee {
  id_donee?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  blood_type?: string;
  address?: {
    state: string;
    locality: string;
    postal_code: string;
    distrit: string;
  };
  photo?: string;
}
