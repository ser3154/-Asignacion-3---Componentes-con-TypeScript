-- Parte A: Tabla genérica

-1. ¿Porqué se puede llamar "genérica"?
 Porque no sabe qué datos muestra. Solo recibe 'columnas' (clave + título) y 'filas' (objetos)
 y, por cada fila, recorre las columnas leyendo 'fila[col.clave]'. Nunca menciona "producto"
 ni "precio" en su código.

 -2. ¿Qué tendría que cambiar para mostrar alumnos?
  Nada en el componente. Solo lo que se le pasa:
  'tabla.columnas = [{ clave: 'matricula', titulo: 'Matricula' }, { clave: 'nombre', titulo: 'Nombre' }]'
  'tabla.filas = [{ matricula: '123456', nombre: 'Ana' }]

-- Parte B: "<contador-cantidad>"

 -1. ¿Qué recibe?
  Los atributos 'valor', 'min' y 'max' (observados).

-2. ¿Qué avisa?
 el evento 'cambio' con 'detail.valor', cada vez que el usuario modifica la cantidad ('bubbles' y 'composed').
 No se emite si ya está en el mínimo o en el máximo.

-3. ¿Qué guarda adentro? 
 el valor actual, el míinimo y el máximo ya validados (campos privados '#valor', '#min', ' #max' y los botones
 del árbol de sombra, que se deshabilitan en los límites.
