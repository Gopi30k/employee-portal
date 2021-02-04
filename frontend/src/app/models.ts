export interface Address {
  aId: number;
  doorNo: string;
  streetName: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Company {
  cId: number;
  name: string;
  address: Address[];
  latitude: string;
  longitude: string;
}

export interface Employee {
  eId: number;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  DOB: string;
  active: boolean;
  company: Company[];
}

export interface Column {
  field: string;
  header: string;
}
