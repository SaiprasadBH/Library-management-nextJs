export interface IMemberBase {
  name: string;
  age: number;
  email: string;
  address: string;
  password: string;
  wallet: number;
  role: "admin" | "user";
}
export interface IMember extends IMemberBase {
  id: number;
}
