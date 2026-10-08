import './boton-app';
import './contador-cantidad';
import estilos from './tarjeta-producto.css?inline';
import type { ContadorCantidad } from './contador-cantidad';
import type { DetalleAgregar } from './tipos';

const pesos = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

export class TarjetaProducto extends HTMLElement {
  static observedAttributes = ['id-producto', 'nombre', 'precio', 'imagen', 'existencia'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() { this.#pintar(); }
  attributeChangedCallback() { if (this.isConnected) this.#pintar(); }

  #pintar() {
    const id = this.getAttribute('id-producto') ?? '';
    const nombre = this.getAttribute('nombre') ?? '';
    const imagen = this.getAttribute('imagen') ?? '';
    const precio = Number(this.getAttribute('precio'));
    const existencia = Number(this.getAttribute('existencia'));
    const agotado = existencia <= 0;

    this.shadowRoot!.innerHTML = `
      <style>${estilos}</style>
      <article class="tarjeta">
        <img src="${imagen}" alt="${nombre}">
        <div class="cuerpo">
          <h3>${nombre}</h3>
          <p class="precio">${pesos.format(precio)}</p>
          <p class="existencia${agotado ? ' agotado' : ''}">${agotado ? 'Agotado' : `${existencia} disponibles`}</p>
          <div class="acciones">
            ${agotado ? '' : `<contador-cantidad valor="1" min="1" max="${existencia}"></contador-cantidad>`}
            <boton-app variante="primario"${agotado ? ' deshabilitado' : ''}>Agregar</boton-app>
          </div>
        </div>
      </article>
    `;

    this.shadowRoot!.querySelector('boton-app')!.addEventListener('click', () => {
      if (agotado) return;
      const contador = this.shadowRoot!.querySelector<ContadorCantidad>('contador-cantidad')!;
      const detail: DetalleAgregar = { id, nombre, precio, cantidad: contador.valor };
      this.dispatchEvent(new CustomEvent('agregar', {
        detail,
        bubbles: true,
        composed: true,
      }));
    });
  }
}

customElements.define('tarjeta-producto', TarjetaProducto);