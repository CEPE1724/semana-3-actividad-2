import { Donacion } from "../domain/Donacion";
import { DonacionModel } from "./DonacionModel";

export class DonacionMapper {
  static toDomain(model: DonacionModel): Donacion {
    return {
      idDonaciones: model.idDonaciones,
      nombre: model.nombre,
      email: model.email,
      monto: model.monto,
      mensaje: model.mensaje ?? undefined,
      createdAt: model.createdAt
    };
  }

  static toPersistence(donacion: Donacion): Omit<Donacion, "idDonaciones" | "createdAt"> {
    return {
      nombre: donacion.nombre,
      email: donacion.email,
      monto: donacion.monto,
      mensaje: donacion.mensaje
    };
  }
}
