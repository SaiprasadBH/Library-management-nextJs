export interface IProfessorBase {
  name: string;
  email: string;
  department?: string | null;
  bio?: string | null;
  calendlyLink?: string | null;
  wallet: number;
}

export interface IProfessor extends IProfessorBase {
  id: number;
}
