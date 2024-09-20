export interface IBookBase {
  title: string;
  author: string;
  publisher: string;
  genre: string;
  isbnNo: string;
  numOfPages: number;
  totalNumOfCopies: number;
  price: number;
  imageURL: string | null;
}
export interface IBook extends IBookBase {
  id: number;
  availableNumOfCopies: number;
}
