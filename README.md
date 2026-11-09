# 🛸 Rick & Morty Portal Finder

Una aplicación web modular construida con JavaScript moderno (ES6+), Bootstrap 5.3 y la API pública de **Rick & Morty**. El proyecto gestiona peticiones HTTP asíncronas con `fetch` y `async/await`, control de errores en interfaz, transformaciones inmutables del estado, filtrado combinado en tiempo real, sistema de favoritos persistente entre páginas, ficha detallada en modal y paginación activa.

---

## 📋 Tabla de Contenidos
- [Características Principales](#-características-principales)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura de Módulos](#-arquitectura-de-módulos)
- [Estados de la Pantalla](#-estados-de-la-pantalla)
- [Conceptos y Patrones Aplicados](#-conceptos-y-patrones-aplicados)
- [Instalación y Uso](#-instalación-y-uso)

---

## 🚀 Características Principales

* **Consumo de API en Tiempo Real:** Integración asíncrona con el endpoint público `/character` mediante `fetch` y `async/await`.
* **Tres Estados de Interfaz:** Control explícito de vista para **Cargando** (spinner), **Error** (alerta responsiva con opción a reintentar) y **Éxito** (tarjetas o mensaje dinámico sin resultados).
* **Filtros Combinados:** Búsqueda en vivo por nombre junto a filtrado por estado (*Alive*, *Dead*, *unknown*).
* **Gestión Inmutable de Favoritos:** Inversión de estado utilizando `.map()` y el operador spread (`...`), acumulando los IDs en memoria sin mutar los arreglos originales.
* **Paginación Activa:** Navegación dinámica a través de las 42+ páginas de la API con sincronización continua de favoritos.
* **Modal con Ficha Técnica:** Inspección detallada del personaje (género, origen, conteo de episodios) mediante componentes nativos de Bootstrap.
* **Seguridad XSS:** Sanitización estricta de cadenas de texto antes de la inyección en el DOM mediante la función `escaparHTML`.

---

## 📁 Estructura del Proyecto

```text
rick-morty-finder/
├── index.html           # Estructura visual, Bootstrap 5.3 y modal de detalle
└── js/
    ├── config.js        # Configuración de URLs y constantes (export default)
    ├── api.js           # Servicio de red (fetch, response.ok, manejo de errores)
    ├── procesadores.js  # Funciones puras (transformaciones, sanitización, HTML)
    └── main.js          # Coordinador del DOM y controlador de eventos