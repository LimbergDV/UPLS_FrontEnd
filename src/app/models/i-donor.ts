export interface iDonor {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  id_donor?: string;
  address?: {
    state: string;
    locality: string;
    postal_code: string;
    distrit: string;
  };
  health_status?: string;
  availability?: string;
  donations_number?: string;
  last_donation?: string;
  blood_type?: string;
  photo?: string;
}
