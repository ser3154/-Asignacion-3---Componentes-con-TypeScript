import './boton-app';
import './tarjeta-producto';
import './tabla-generica';
import type { TablaGenerica } from './tabla-generica';
import type { Producto } from './tipos';

const productos: Producto[] = [
  { id: 'P-001', nombre: 'Tenis para correr Vento', precio: 1299, categoria: 'calzado', imagen: '/img/producto-01.jpg', existencia: 8 },
  { id: 'P-002', nombre: 'Tenis de entrenamiento Cross', precio: 1549, categoria: 'calzado', imagen: '/img/producto-02.jpg', existencia: 25 },
  { id: 'P-003', nombre: 'Tenis casuales Urbano', precio: 989, categoria: 'calzado', imagen: '/img/producto-03.jpg', existencia: 8 },
  { id: 'P-004', nombre: 'Sandalias de recuperación', precio: 449, categoria: 'calzado', imagen: '/img/producto-04.jpg', existencia: 25 },
  { id: 'P-005', nombre: 'Playera deportiva seca', precio: 399, categoria: 'ropa', imagen: '/img/producto-05.jpg', existencia: 3 },
  { id: 'P-006', nombre: 'Playera de algodón clásica', precio: 289, categoria: 'ropa', imagen: '/img/producto-06.jpg', existencia: 25 },
  { id: 'P-007', nombre: 'Sudadera con capucha', precio: 749, categoria: 'ropa', imagen: '/img/producto-07.jpg', existencia: 8 },
  { id: 'P-008', nombre: 'Short de entrenamiento', precio: 359, categoria: 'ropa', imagen: '/img/producto-08.jpg', existencia: 12 },
  { id: 'P-009', nombre: 'Licra de compresión', precio: 529, categoria: 'ropa', imagen: '/img/producto-09.jpg', existencia: 0 },
  { id: 'P-010', nombre: 'Pantalón deportivo', precio: 649, categoria: 'ropa', imagen: '/img/producto-10.jpg', existencia: 5 },
  { id: 'P-011', nombre: 'Chamarra rompeviento', precio: 899, categoria: 'ropa', imagen: '/img/producto-11.jpg', existencia: 0 },
  { id: 'P-012', nombre: 'Calcetas deportivas (3 pares)', precio: 179, categoria: 'ropa', imagen: '/img/producto-12.jpg', existencia: 25 },
];

const rejilla = document.querySelector<HTMLElement>('#rejilla')!;
const cuenta = document.querySelector<HTMLElement>('#cuenta')!;
const vaciar = document.querySelector<HTMLElement>('#vaciar')!;
const tabla = document.querySelector<TablaGenerica>('#tabla-carrito')!;

const pesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

interface ItemCarrito {
  id: string;
  producto: string;
  precio: number;
  cantidad: number;
}

const carrito = new Map<string, ItemCarrito>();

tabla.columnas = [
  { clave: 'producto', titulo: 'Producto' },
  { clave: 'precio', titulo: 'Precio' },
  { clave: 'cantidad', titulo: 'Cantidad' },
];

const pintarCarrito = () => {
  const items = [...carrito.values()];

  cuenta.textContent = String(items.reduce((suma, i) => suma + i.cantidad, 0));

  tabla.filas = items.map((i) => ({
    producto: i.producto,
    precio: pesos.format(i.precio),
    cantidad: i.cantidad,
  }));
};

for (const p of productos) {
  const tarjeta = document.createElement('tarjeta-producto');
  tarjeta.setAttribute('id-producto', p.id);
  tarjeta.setAttribute('nombre', p.nombre);
  tarjeta.setAttribute('precio', String(p.precio));
  tarjeta.setAttribute('imagen', p.imagen);
  tarjeta.setAttribute('existencia', String(p.existencia));
  rejilla.append(tarjeta);
}

// Un solo listener en el contenedor
rejilla.addEventListener('agregar', (e) => {
  const { id, nombre, precio, cantidad } = e.detail;
  const existente = carrito.get(id);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.set(id, { id, producto: nombre, precio, cantidad });
  }

  pintarCarrito();
});

// Opcional: el contador avisa cada cambio (el evento sale del Shadow DOM)
rejilla.addEventListener('cambio', (e) => {
  console.log('Nueva cantidad:', e.detail.valor);
});

vaciar.addEventListener('click', () => {
  carrito.clear();
  pintarCarrito();
});

pintarCarrito(); 