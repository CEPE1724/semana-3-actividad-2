import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CreateDonacion } from "../application/CreateDonacion";
import { ListDonaciones } from "../application/ListDonaciones";
import { CreateDonacionDto } from "./CreateDonacionDto";
import { UpdateDonacion } from "../application/UpdateDonacion";
import { DeleteDonacion } from "../application/DeleteDonacion";

export class DonacionController {
  constructor(
    private readonly createDonacion: CreateDonacion,
    private readonly listDonaciones: ListDonaciones,
    private readonly updateDonacion: UpdateDonacion,
    private readonly deleteDonacion: DeleteDonacion
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const dto = plainToInstance(CreateDonacionDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors.flatMap((e) => Object.values(e.constraints ?? {}));
      res.status(400).json({ message: messages });
      return;
    }

    try {
      const donacion = await this.createDonacion.execute(dto);
      res.status(201).json(donacion);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(400).json({ message });
    }
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    try {
      const donaciones = await this.listDonaciones.execute();
      res.status(200).json(donaciones);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const dto = plainToInstance(CreateDonacionDto, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors.flatMap((e) => Object.values(e.constraints ?? {}));
      res.status(400).json({ message: messages });
      return;
    }

    try {
      const donacion = await this.updateDonacion.execute(id, dto);
      res.status(200).json(donacion);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(400).json({ message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
      await this.deleteDonacion.execute(id);
      res.status(200).json({ message: `Donación con id ${id} eliminada correctamente` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(400).json({ message });
    }
  };
}
