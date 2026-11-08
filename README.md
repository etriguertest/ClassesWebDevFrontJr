# GhostNet v2: Terminal Clasificada de Agentes Secretos

**GhostNet v2** es una aplicación web interactiva desarrollada en JavaScript moderno (ES6+), diseñada para simular una terminal de ciberdefensa y operaciones en campo. El proyecto implementa patrones de desarrollo orientados al ecosistema de React, haciendo un uso intensivo de **funciones flecha, callbacks, manipulación del DOM y gestión inmutable del estado**.

---

## Estructura del Proyecto

El proyecto mantiene una arquitectura limpia y modular con separación estricta de responsabilidades:

```text
ghostnet-terminal/
├── index.html        # Estructura base, CDN de Bootstrap 5 y contenedores de inyección
├── css/
│   └── style.css     # Estilos personalizados (Tema Cyberpunk/Dark Terminal)
└── app.js            # Lógica principal, estado, validaciones y renderizado dinámico