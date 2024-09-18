export interface IMemberBase {
  name: string;
  age: number;
  email: string;
  address: string;
  password: string;
  role: "admin" | "user";
}
export interface IMember extends IMemberBase {
  id: number;
}
