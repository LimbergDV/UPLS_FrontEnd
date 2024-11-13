export interface iBankInfo {
  name_place: string;
  phone_number: string;
  address: {
    street: string;
    distrit: string;
    locality: string;
    postal_code: string;
    state: string;
  };
}
