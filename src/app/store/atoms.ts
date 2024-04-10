import { atom } from "jotai";

interface Data {
  id: string;
  created_at: string;
  title: string;
  body: string;
}

// Create a WritableAtom
const dataAtom = atom<Data[]>([]);

export { dataAtom };
