import { IsEmail, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateDonacionDto {
  @IsString({ message: "El nombre debe ser texto" })
  @MinLength(2, { message: "El nombre debe tener al menos 2 caracteres" })
  nombre!: string;

  @IsEmail({}, { message: "El email no es valido" })
  email!: string;

  @IsNumber({}, { message: "El monto debe ser un numero" })
  @Min(1, { message: "El monto debe ser mayor a 0" })
  monto!: number;

  @IsString({ message: "El mensaje debe ser texto" })
  @IsOptional()
  mensaje?: string;
}
