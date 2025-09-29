import { PaginationRequest } from "../../../../shared/helpers/paginator.helper";

interface Status {
  isSuccess: boolean;
  statusCode: number;
  message: string;
}

interface ApiResponseArray<T> {
  status: Status;
  payload: T[];
}

interface ApiResponseObject<T> {
  status: Status;
  payload: T;
}

interface Cuenta {
  idCuenta: number;
  numeroCuenta: string;
}

interface PayloadBancos {
  idBanco: number;
  nombre: string;
  cuentas: Cuenta[];
}

export interface PayloadClientes {
  idCliente: number;
  nombre: string;
  rfc?: string;
}

export interface Params {
  paginationRequest: PaginationRequest;
  searchTerm: string;
  idCliente?: number;
}
export interface StateOptions {
  label: string;
  value: string;
}


export interface PayloadIngresos {
  idIngreso: number;
  importe: number;
  fecha: Date;
  referencia: string;
  saldo: number;
}

export interface ParamsIngresos {
  idCliente: number | null;
  idProveedor: number | null;
  idCuentaBancaria: number | null;
  dateMin?: string;
  dateMax?: string;
}

export interface PayloadProveedores {
  provId: number;
  nombre: string;
}

export interface PayloadFactura {
  idFactura: number;
  fecha: Date;
  factura: string;
  cliente: string;
  contratoAnexo: string;
  concepto: string;
  saldo: number;
  saldoOriginal: number;
  totalNeto: number;
}

export interface CreatePaymentBatchRequest {
  partyType: number;
  mode: number;
  entityId: number;
  idIngreso: number;
  items: Items[];
}

export interface Items {
  facId: number;
  pagoNetoFac: number;
}

export interface CreatePaymentBatchResponse {
  id: number;
  jobId: string;
  location: string;
}

export interface PayloadGetBatchStatus {
  batchId: number;
  state: number;
  total: number;
  succeeded: number;
  failed: number;
  running: number;
  difference: null;
}



export type Bancos = ApiResponseArray<PayloadBancos>;
export type Clientes = ApiResponseArray<PayloadClientes>;
export type Cliente = ApiResponseObject<PayloadClientes>;
export type Proveedores = ApiResponseArray<PayloadProveedores>
export type Ingresos = ApiResponseArray<PayloadIngresos>
export type Proveedor = ApiResponseObject<PayloadProveedores>
export type Facturas = ApiResponseArray<PayloadFactura>
export type Factura = ApiResponseObject<PayloadFactura>
export type GetBatchStatus = ApiResponseObject<PayloadGetBatchStatus>
