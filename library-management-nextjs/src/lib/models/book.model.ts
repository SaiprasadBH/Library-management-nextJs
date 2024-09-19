export interface IBookBase {
  title: string;
  author: string;
  publisher: string;
  genre: string;
  isbnNo: string;
  numOfPages: number;
  totalNumOfCopies: number;
  imageURL?: string | null;
  price?: number | null;
}
export interface IBook extends IBookBase {
  id: number;
  availableNumOfCopies: number;
}
