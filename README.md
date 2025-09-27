# 📚 Pokédex Web: Consulta de la PokéAPI

## 🌟 Descripción del Proyecto

Esta **Pokédex Web** es una aplicación interactiva desarrollada en **HTML, CSS (BEM)** y **JavaScript (Vanilla JS)**.
Permite a los usuarios buscar información detallada sobre cualquier Pokémon por **nombre o ID**, cargar una lista inicial y gestionar sus favoritos de forma persistente.

El proyecto cumple con estrictos requisitos técnicos, asegurando un **diseño responsivo** y un **código modular**.

---

## ✨ Requisitos Funcionales

### 🔹 Pantalla Inicial

* **Búsqueda:** Campo de entrada para buscar Pokémon por nombre o ID.
* **Carga Inicial:** Botón para cargar los primeros 20 Pokémon.

### 🔹 Detalle del Pokémon

Muestra:

* Nombre
* ID
* Imagen oficial (Sprite)
* Tipos
* Altura
* Peso
* Estadísticas Base (HP, Ataque, Defensa, etc.)

### 🔹 Favoritos

* Permite marcar/desmarcar Pokémon como favoritos.
* Utiliza **localStorage** para guardar los favoritos (persistencia).
* Sección lateral dedicada a **"Mis Favoritos"**.

---

## 🛠️ Requisitos Técnicos e Implementación

### 1. Consumo de Datos y Manipulación del DOM

| Requisito Técnico                 | Implementación Clave                                                                                                                                      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fetch API para consumir datos** | Uso de la Fetch API de JavaScript con `async/await` para consultar la PokéAPI ([https://pokeapi.co/api/v2/pokemon/](https://pokeapi.co/api/v2/pokemon/)). |
| **Manipulación del DOM**          | JavaScript crea dinámicamente elementos HTML y actualiza secciones (`#pokemonDetail`, `#favoritesList`) al renderizar datos.                              |
| **Eventos en JavaScript**         | Gestión de eventos `click` y `keypress` para la búsqueda y la funcionalidad de favoritos (`toggleFavorite`).                                              |

### 2. Estilización y Diseño

| Requisito Técnico   | Implementación Clave                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Metodología BEM** | Todas las clases CSS siguen la convención **Bloque__Elemento--Modificador** (Ej: `.pokemon-card__name`, `.controls__button--primary`).   |
| **CSS Responsivo**  | Implementación de `@media queries` para un diseño adaptativo, utilizando **CSS Grid** para la estructura de tres columnas en escritorio. |

---


Navega al directorio del proyecto.

Abre el archivo **`index.html`** en tu navegador web.

💡 *Sugerencia:* Para desarrollar localmente sin problemas de CORS, usa una extensión de servidor web local (como **Live Server** de VS Code).

---

### 2. Estructura de Archivos

```
.
├── index.html          # Estructura principal de la Pokédex
├── style.css           # Estilos con metodología BEM y diseño responsivo
└── script.js           # Lógica, Fetch API, DOM y gestión de favoritos
```





