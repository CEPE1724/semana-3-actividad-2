import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from "sequelize";
import { sequelize } from "../../Shared/infrastructure/database";

export class DonacionModel extends Model<
  InferAttributes<DonacionModel>,
  InferCreationAttributes<DonacionModel>
> {
  declare idDonaciones: CreationOptional<number>;
  declare nombre: string;
  declare email: string;
  declare monto: number;
  declare mensaje: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

DonacionModel.init(
  {
    idDonaciones: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    mensaje: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: "donaciones",
    modelName: "Donacion",
    timestamps: true
  }
);
