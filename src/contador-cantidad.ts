import estilos from './contador-cantidad.css?inline';
import type { DetalleCambio } from './tipos';


export class ContadorCantidad extends HTMLElement{
    static observedAttributes = ['valor', 'min', 'max'];

    #valor = 1;
    #min = 1;
    #max = 12;

    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() { this.#pintar(); }

    attributeChangedCallback(nombre: string, _anterior: string | null, nuevo: string | null){
        const n = Number(nuevo);
        if(nuevo === null || Number.isNaN(n)) return;

        if(nombre === 'min') this.#min = n;
        if(nombre === 'max') this.#max = n;
        if(nombre === 'valor') this.#valor = n;

        this.#valor = Math.min(this.#max, Math.max(this.#min, this.#valor));
        if (this.isConnected) this.#pintar();
    }

    get valor(): number { return this.#valor; }

    #cambiar(delta: number){
        const nuevo = Math.min(this.#max, Math.max(this.#min, this.#valor + delta));
        if (nuevo === this.#valor) return;

        this.#valor = nuevo;
        this.#pintar();

        const detail: DetalleCambio = { valor: this.#valor };
        this.dispatchEvent(new CustomEvent('cambio', {
            detail,
            bubbles: true,
            composed: true,
        }));
    }

    #pintar(){
    const sombra = this.shadowRoot!;
    sombra.innerHTML = `
      <style>${estilos}</style>
      <button type="button" class="menos" aria-label="Disminuir cantidad"${this.#valor <= this.#min ? ' disabled' : ''}>−</button>
      <span class="valor">${this.#valor}</span>
      <button type="button" class="mas" aria-label="Aumentar cantidad"${this.#valor >= this.#max ? ' disabled' : ''}>+</button>
    `;

    sombra.querySelector('.menos')!.addEventListener('click', () => this.#cambiar(-1));
    sombra.querySelector('.mas')!.addEventListener('click', () => this.#cambiar(1));
    }
}

customElements.define('contador-cantidad', ContadorCantidad);