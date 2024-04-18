export interface User {
  id?: string;
  first_name: string | null;
  last_name: string | null;
  email?: string;
  role?: string;
}

export interface Feeder {
  id: string;
  name: string | null;
  stable_id: string | null;
}

export interface Horse {
  id: string;
  name: string | null;
}

export interface Stable {
  id: string;
  name: string | null;
  admin_id: string | null;
  users: User[];
  feeders: Feeder[];
  horses: Horse[];
}

export interface FeederFormData {
  name: string;
  adminId: string;
  weight: string;
  foodType: string;
}
