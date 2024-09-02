export interface IMemberBase {
  name: string;
  age: number;
  email: string;
  address: string;
  password: string;
  role: "admin" | "librarian" | "user";
}
export interface IMember extends IMemberBase {
  id: number;
}
