export interface IProfessorBase {
  name: string;
  email: string;
  department?: string | null;
  bio?: string | null;
  calendlyLink: string | null;
}

export interface IProfessor extends IProfessorBase {
  id: number;
}
