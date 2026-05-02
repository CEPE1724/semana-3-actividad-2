import { Donacion } from "../domain/Donacion";
import { DonacionRepository } from "../domain/DonacionRepository";
export class UpdateDonacion {
  constructor(private readonly repository: DonacionRepository) {
    }

    async execute(id: number, donacion: Donacion): Promise<Donacion> {
        return this.repository.update(id, donacion);
    }
}