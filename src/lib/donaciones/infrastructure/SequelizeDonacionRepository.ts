import { Donacion } from "../domain/Donacion";
import { DonacionRepository } from "../domain/DonacionRepository";
import { DonacionMapper } from "./DonacionMapper";
import { DonacionModel } from "./DonacionModel";

export class SequelizeDonacionRepository implements DonacionRepository {
  async create(donacion: Donacion): Promise<Donacion> {
    const created = await DonacionModel.create(DonacionMapper.toPersistence(donacion));
    return DonacionMapper.toDomain(created);
  }

  async findAll(): Promise<Donacion[]> {
    const rows = await DonacionModel.findAll({ order: [["createdAt", "DESC"]] });
    return rows.map((row) => DonacionMapper.toDomain(row));
  }

  async update(id: number, donacion: Donacion): Promise<any> {
    await DonacionModel.update(
      DonacionMapper.toPersistence(donacion),
      { where: { idDonaciones: id } }
    );

    const updated = await DonacionModel.findOne({ where: { idDonaciones: id } });

    if (!updated) {
      throw new Error(`Donacion con id ${id} no encontrada`);
    }

    return DonacionMapper.toDomain(updated);
  }

    async delete(id: number): Promise<void> {
    await DonacionModel.destroy({ where: { idDonaciones: id } });
  }
}
