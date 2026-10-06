import estilos from './boton-app.css?inline';

export class BotonApp extends HTMLElement {
  static observedAttributes = ['variante', 'deshabilitado'];
  #boton: HTMLButtonElement;

  constructor() {
    super();
    const sombra = this.attachShadow({ mode: 'open' });
    sombra.innerHTML = `
      <style>${estilos}</style>
      <button class="secundario"><slot>Vaciar</slot></button>
    `;
    this.#boton = sombra.querySelector('button')!;
  }

  connectedCallback() { this.#actualizar(); }
  attributeChangedCallback() { this.#actualizar(); }

  #actualizar() {
    // variantes: primario | secundario | peligro
    this.#boton.className = this.getAttribute('variante') ?? 'secundario';
    this.#boton.disabled = this.hasAttribute('deshabilitado');
  }
}

customElements.define('boton-app', BotonApp);