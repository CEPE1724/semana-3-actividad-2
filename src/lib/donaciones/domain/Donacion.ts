export interface Donacion {
  idDonaciones?: number;
  nombre: string;
  email: string;
  monto: number;
  mensaje?: string;
  createdAt?: Date;
}
