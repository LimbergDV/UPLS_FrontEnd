export interface iDonorSearch {
  addreess: {
    distrit: string;
    locality: string;
    postal_code: string;
    state: string;
  };
  blood_type: string;
  compatibility: string[];
  fist_name: string;
  id_donor: number;
  last_name: string;
}
