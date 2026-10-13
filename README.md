# Taller de Algoritmos en JavaScript

Este repositorio contiene la solución completa para el **Taller de Algoritmos en JavaScript**, estructurado como un programa interactivo de consola en Node.js que incluye un menú de selección y entrada de datos por teclado.

---

## 📋 Pasos a Seguir

1. **Revisión de Materiales:** Revisar previamente los materiales del módulo (videos, ejemplos y lecturas).
2. **Creación del Archivo:** Crear un archivo llamado `taller-algoritmos.js`.
3. **Resolución de Desafíos:** Resolver cada una de las tres rondas propuestas.
4. **Documentación Interna:** Agregar comentarios en el código explicando la lógica utilizada.
5. **Pruebas:** Probar el funcionamiento del programa antes de enviarlo.
6. **Entrega:** Guardar el archivo correctamente para su entrega.
7. **Honestidad Académica:** Garantizar que el trabajo sea completamente original y realizado por ti.

---

## 🎯 Desafíos a Resolver

### Desafío 1: Condicionales Simples
* **Objetivo:** Crear un algoritmo que determine si un año es bisiesto.
* **Lógica:** Un año es bisiesto si es divisible entre 4 y no es divisible entre 100, o si es divisible entre 400 (`(anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)`).

### Desafío 2: Ciclos y Arreglos
* **Objetivo:** Crear un algoritmo que encuentre el número más grande en una lista de 10 números.
* **Lógica:** Se recopilan 10 números en un arreglo y se recorre mediante un ciclo `for`, comparando cada elemento contra una variable de control para identificar el valor máximo.

### Desafío 3: Combinación de Estructuras
* **Objetivo:** Crear un juego donde la computadora elige un número y el usuario tiene 5 intentos para adivinarlo. El programa debe mostrar pistas como "El número es más alto" o "El número es más bajo".
* **Lógica:** Se genera un número aleatorio entre 1 y 100. En cada intento, el programa evalúa si la respuesta es correcta o si debe ofrecer pistas dinámicas (*"MÁS ALTO"* o *"MÁS BAJO"*).

---

## 🛠️ Requisitos del Sistema

* **Node.js** (Versión 14.x o superior recomendada).

Para verificar si tienes instalado Node.js, ejecuta en tu terminal:

```bash
node -v