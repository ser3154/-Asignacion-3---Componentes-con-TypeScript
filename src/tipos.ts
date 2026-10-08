export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  existencia: number; 
}

export interface DetalleAgregar{
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface Columna{
  clave: string;
  titulo: string;
}

export type Fila = Record<string, unknown>;

export interface DetalleCambio{
  valor: number;
}

declare global {
  interface HTMLElementEventMap {
    agregar: CustomEvent<DetalleAgregar>;
    cambio: CustomEvent<DetalleCambio>;
  }
}