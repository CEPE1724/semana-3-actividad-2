import { Router } from "express";
import { CreateDonacion } from "../application/CreateDonacion";
import { ListDonaciones } from "../application/ListDonaciones";
import { UpdateDonacion } from "../application/UpdateDonacion";
import { DeleteDonacion } from "../application/DeleteDonacion";
import { DonacionController } from "./DonacionController";
import { SequelizeDonacionRepository } from "./SequelizeDonacionRepository";

const donacionRouter = Router();

const repository = new SequelizeDonacionRepository();
const createDonacion = new CreateDonacion(repository);
const listDonaciones = new ListDonaciones(repository);
const updateDonacion = new UpdateDonacion(repository);
const deleteDonacion = new DeleteDonacion(repository);
const controller = new DonacionController(createDonacion, listDonaciones, updateDonacion, deleteDonacion);

donacionRouter.get("/getAllDonaciones", controller.list);
donacionRouter.post("/insertDonacion", controller.create);
donacionRouter.patch("/updateDonacion/:id", controller.update);
donacionRouter.delete("/deleteDonacion/:id", controller.delete);

export { donacionRouter };
