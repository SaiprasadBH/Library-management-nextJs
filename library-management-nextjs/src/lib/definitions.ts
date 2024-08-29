export interface IBookBase {
  title: string;
  author: string;
  publisher: string;
  genre: string;
  isbnNo: string;
  numOfPages: number;
  totalNumOfCopies: number;
}
export interface IBook extends IBookBase {
  id: number;
  availableNumOfCopies: number;
}

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
