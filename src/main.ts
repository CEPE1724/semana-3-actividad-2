import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { connectDatabase } from "./lib/Shared/infrastructure/database";
import { sequelize } from "./lib/Shared/infrastructure/database";
import { env } from "./lib/Shared/infrastructure/env";
import { donacionRouter } from "./lib/donaciones/infrastructure/donacion.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/uisrael", donacionRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Something broke!" });
});

app.listen(env.port, async () => {
  try {
    await connectDatabase();
    await sequelize.sync();
    console.log(`Servidor escuchando en el puerto ${env.port}`);
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
});
