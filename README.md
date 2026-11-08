## 4. Conceptos clave

### 4.1 Desestructuración: sacar piezas de un objeto o de un arreglo

En vez de repetir `personaje.name`, `personaje.status`, desempacas lo que necesitas en una sola línea.

| Qué quieres | Sintaxis | Ejemplo |
| :--- | :--- | :--- |
| **Sacar propiedades de un objeto** | `const { a, b } = objeto` | `const { name, status } = personaje` |
| **Cambiar el nombre (alias)** | `const { a: otroNombre } = objeto` | `const { species: especie } = personaje` |
| **Entrar a un objeto anidado** | `const { x: { y } } = objeto` | `const { origin: { name: planeta } } = personaje` |
| **Valor por defecto si no existe** | `const { a = valor } = objeto` | `const { gender = 'Sin dato' } = personaje` |
| **Sacar elementos de un arreglo** | `const [a, b] = arreglo` | `const [lider, segundo] = equipo` |
| **Primero y el resto** | `const [a, ...resto] = arreglo` | `const [primero, ...resto] = equipo` |
| **En los parámetros de una función** | `({ a, b }) => ...` | `({ name, status }) => name + status` |

> **Dos reglas para no confundirte:**
> * **En objetos:** Importa el **nombre de la propiedad** (el orden no importa).
> * **En arreglos:** Importa la **posición** (el nombre lo eliges tú).

---

### 4.2 Spread (`...`): copiar y modificar sin tocar el original

| Qué quieres | Ejemplo |
| :--- | :--- |
| **Copiar un arreglo** | `const copia = [...equipo]` |
| **Agregar a un arreglo** | `const nuevo = [...equipo, 'Beth']` |
| **Copiar un objeto** | `const copia = { ...personaje }` |
| **Copiar un objeto y cambiar/agregar algo** | `const actualizado = { ...personaje, favorito: true }` |

**El orden importa en objetos:** lo que va después sobrescribe lo anterior.

```javascript
const a = { ...personaje, status: 'Dead' };  // status → 'Dead'  (gana lo último)
const b = { status: 'Dead', ...personaje };  // status → 'Alive' (el objeto pisa)
 ```
---
### 4.5 Asincronía: API, JSON, promesas y async/await

* **¿Qué es una API?** Un servicio en internet al que le pides datos a través de una dirección (URL). Hoy usaremos la API pública de *Rick & Morty*.
* **¿Qué es JSON?** El formato de texto en el que viajan los datos. Se parece a un objeto de JavaScript, pero es texto: hay que convertirlo (`.json()`).
* **¿Qué es HTTP?** El idioma de la petición. Cada respuesta trae un código de estado:

| Código | Significa | `response.ok` |
| :--- | :--- | :--- |
| **200** | Todo bien | `true` |
| **404** | No existe lo que pediste | `false` |
| **500** | Falló el servidor | `false` |

> 🍽️ **Analogía del restaurante:** Pides un plato y el mesero te da un ticket. No te quedas congelado frente a la cocina: sigues conversando y, cuando el plato está listo, te lo traen. **Ese ticket es una promesa.**

#### Síncrono vs. Asíncrono
* **Síncrono:** Una instrucción espera a que termine la anterior. Si una tarea tarda, todo se congela.
* **Asíncrono:** La tarea lenta (pedir datos por internet) se lanza y el programa sigue; el resultado llega después.

Una promesa (`Promise`) representa un valor que llegará en el futuro y tiene tres estados:

| Estado | Significa |
| :--- | :--- |
| `pending` | Todavía esperando |
| `fulfilled` | Se cumplió: ya hay un valor |
| `rejected` | Falló: hay un error |

#### Cómo se consume una promesa:

```javascript
// Forma antigua: .then / .catch (la verás en muchos tutoriales)
pedirDatos().then((datos) => console.log(datos));

// Forma moderna: async / await (la que usaremos)
const mostrar = async () => {
  const datos = await pedirDatos();
  console.log(datos);
};
```
## 4.6 Los tres estados de una pantalla con datos remotos

Mientras esperas datos, tu interfaz debe estar siempre en uno de estos estados:

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Un spinner |
| Éxito | Los datos (o un mensaje "sin resultados") |
| Error | Un mensaje claro de qué falló |

## 4.7 Eventos en elementos que se crean con JavaScript

Las tarjetas se crean después de cargar la página, así que no puedes ponerle un listener a cada botón al inicio. La solución es la delegación de eventos: un solo listener en el contenedor que detecta de dónde vino el clic.

| Pieza | Para qué sirve |
|---|---|
| `evento.target` | El elemento exacto donde hiciste clic |
| `.closest('selector')` | Sube por los padres hasta encontrar el que coincide (o `null`) |
| `data-id="5"` en el HTML | Guarda un dato dentro del elemento |
| `elemento.dataset.id` | Lee ese dato en JavaScript (siempre como texto) |

```javascript
contenedor.addEventListener('click', (evento) => {
  const tarjeta = evento.target.closest('[data-id]');

  if (!tarjeta) {
    return;
  }

  console.log(tarjeta.dataset.id);
});
```
## 4.8 Seguridad: los datos externos no son de confianza

Todo texto que no hayas escrito tú —por ejemplo, el que viene de un formulario o de una API— debe pasar primero por `escaparHTML` antes de insertarlo con `innerHTML`.

La función convierte `<`, `>`, `&` y `"` en versiones inofensivas. Hoy la usaremos en las tarjetas. No necesitas memorizar las expresiones entre `/ /`; solo saber qué hace la función.