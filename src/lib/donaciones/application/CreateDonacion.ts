import { Donacion } from "../domain/Donacion";
import { DonacionRepository } from "../domain/DonacionRepository";

export class CreateDonacion {
  constructor(private readonly repository: DonacionRepository) {}

  async execute(input: Donacion): Promise<Donacion> {
    if (!input.nombre || input.nombre.trim().length < 2) {
      throw new Error("El nombre es obligatorio y debe tener al menos 2 caracteres");
    }

    if (!input.email || !input.email.includes("@")) {
      throw new Error("El email no es valido");
    }

    if (!Number.isFinite(input.monto) || input.monto <= 0) {
      throw new Error("El monto debe ser mayor a 0");
    }

    return this.repository.create({
      nombre: input.nombre.trim(),
      email: input.email.trim().toLowerCase(),
      monto: input.monto,
      mensaje: input.mensaje?.trim()
    });
  }
}
