import { Donacion } from "../domain/Donacion";
import { DonacionRepository } from "../domain/DonacionRepository";
export class DeleteDonacion {
  constructor(private readonly repository: DonacionRepository) {
    }

    async execute(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}