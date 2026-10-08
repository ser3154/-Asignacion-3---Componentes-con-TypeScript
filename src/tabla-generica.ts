import estilos from './tabla-generica.css?inline';
import type { Columna, Fila } from './tipos';

export class TablaGenerica extends HTMLElement{
    #columnas: Columna[] = [];
    #filas: Fila[] = [];

    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){ this.#pintar(); }

    get columnas(): Columna[] { return this.#columnas; }
    set columnas(valor: Columna[]){
        this.#columnas = Array.isArray(valor) ? valor : [];
        this.#pintar();
    }

    get filas(): Fila[] { return this.#filas; }
    set filas(valor: Fila[]){
        this.#filas = Array.isArray(valor) ? valor : [];
        this.#pintar();
    }

    #pintar(){
        const sombra = this.shadowRoot!;
        sombra.replaceChildren();

        const estilo = document.createElement('style');
        estilo.textContent = estilos;
        sombra.append(estilo);

        if (this.#filas.length === 0){
            const vacio = document.createElement('p');
            vacio.className = 'vacio';
            vacio.textContent = 'Sin datos';
            sombra.append(vacio);
            return;
        }

        const tabla = document.createElement('table');

        const encabezado = tabla.createTHead().insertRow();
        for (const col of this.#columnas){
            const th = document.createElement('th');
            th.textContent = col.titulo;
            encabezado.append(th);
        }

        const cuerpo = tabla.createTBody();
        for (const fila of this.#filas){
            const tr = cuerpo.insertRow();
            for (const col of this.#columnas){
                tr.insertCell().textContent = String(fila[col.clave] ?? '');
            }
        }

        sombra.append(tabla);
    }
}

customElements.define('tabla-generica', TablaGenerica);