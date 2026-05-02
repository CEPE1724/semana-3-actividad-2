import { Donacion } from "../domain/Donacion";
import { DonacionRepository } from "../domain/DonacionRepository";

export class ListDonaciones {
  constructor(private readonly repository: DonacionRepository) {}

  async execute(): Promise<Donacion[]> {
    return this.repository.findAll();
  }
}
