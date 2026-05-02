import { Donacion } from "./Donacion";

export interface DonacionRepository {
  create(donacion: Donacion): Promise<Donacion>;
  findAll(): Promise<Donacion[]>;
  update(id: number, donacion: Donacion): Promise<Donacion>;
  delete(id: number): Promise<void>;
}
