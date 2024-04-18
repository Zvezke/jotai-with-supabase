import { atom } from "jotai";

import type { User, Stable, Feeder } from "@/lib/types";
import type { Horse } from "@/lib/stables.types";

interface Data {
  id: string;
  created_at: string;
  title: string;
  body: string;
}

// Create a WritableAtom
const dataAtom = atom<Data[]>([]);
// const userAtom = atom<string>("");
// const horsesAtom = atom<Horses[]>([]);

const userAtom = atom<User[]>([]);
const horseAtom = atom<Horse[]>([]);
const stablesAtom = atom<Stable[] | null>([]);
const selectedStableAtom = atom<Stable | null>(null);
const stablesHorsesAtom = atom<Horse[] | null>([]);

// export { dataAtom, userAtom };
export {
  dataAtom,
  userAtom,
  stablesAtom,
  selectedStableAtom,
  stablesHorsesAtom,
  horseAtom,
};
