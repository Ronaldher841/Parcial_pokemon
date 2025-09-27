📖 Pokédex Web: Consulta de la PokéAPI
🌟 Descripción del Proyecto
Esta Pokédex Web es una aplicación de consulta interactiva desarrollada en HTML, CSS y JavaScript (Vanilla JS). Permite a los usuarios buscar información detallada sobre cualquier Pokémon por nombre o ID, ver una lista inicial de criaturas y guardar sus favoritos en el navegador.

El proyecto fue construido siguiendo estrictos requisitos técnicos, incluyendo el consumo de datos mediante Fetch API y una estructura de estilos modular utilizando la metodología BEM.

✨ Requisitos Funcionales
La aplicación cumple con las siguientes funcionalidades principales:

Pantalla Inicial:

Búsqueda: Un campo de texto y botón para buscar Pokémon por nombre o número de ID.

Carga Inicial: Un botón para cargar y mostrar los primeros 20 Pokémon.

Detalle del Pokémon:

Muestra el Nombre, ID, Imagen oficial (Sprite), Tipos (ej. Fuego/Agua), Altura y Peso.

Muestra las Estadísticas Base (HP, Ataque, Defensa, Velocidad, etc.).

Favoritos:

Permite marcar/desmarcar cualquier Pokémon como favorito desde su vista de detalle.

Persistencia: Los favoritos se guardan localmente utilizando localStorage.

Muestra una sección lateral dedicada a "Mis Favoritos".

🛠️ Requisitos Técnicos e Implementación
El proyecto se construyó cumpliendo rigurosamente los siguientes requisitos técnicos:

1. Consumo de Datos con Fetch API
API Utilizada: Todos los datos se obtienen de la PokéAPI (https://pokeapi.co/api/v2/pokemon/).

Implementación: Se utiliza la API nativa de JavaScript, Fetch API, dentro de funciones async/await para gestionar la obtención de datos de manera asíncrona (fetchPokemonDetail, fetchInitialPokemon). Esto garantiza un manejo eficiente de las peticiones HTTP.

2. Manipulación Dinámica del DOM
Renderizado: JavaScript se encarga de crear dinámicamente los elementos HTML (div.pokemon-card, ul.detail__types-list, etc.) basados en los datos recibidos de la API.

Actualización: La sección de detalles (#pokemonDetail) y la lista de favoritos (#favoritesList) se actualizan o re-renderizan completamente cada vez que se selecciona un Pokémon o se cambia el estado de un favorito.

3. Eventos en JavaScript para Interactividad
Búsqueda: Se captura el evento click del botón de búsqueda y el evento keypress (tecla Enter) del campo de entrada para disparar la función handleSearch y fetchPokemonDetail.

Favoritos: Se adjuntan event listeners a los botones de favorito (.detail__favorite-button) para llamar a la función toggleFavorite y actualizar tanto el estado visual del botón como el localStorage.

Selección: Se adjunta un event listener click a cada tarjeta de Pokémon (.pokemon-card) para cargar su detalle (fetchPokemonDetail).

4. CSS Responsivo
Diseño Fluido: El diseño se adapta automáticamente a diferentes tamaños de pantalla (móvil, tablet y escritorio).

Media Queries: Se utilizan @media queries para definir puntos de quiebre (breakpoints):

Móvil (por defecto): Estructura apilada verticalmente. La lista muestra 2 tarjetas por fila.

Escritorio (1024px+): Se usa CSS Grid para crear un diseño de tres columnas (Favoritos, Detalle, Lista) con proporciones definidas (1fr 2fr 1.5fr).

5. Metodología BEM (Bloque Elemento--Modificador)
Clasificación: Todas las clases CSS siguen la convención BEM para asegurar un código modular, escalable y legible.

Bloques: Ej. .pokedex, .header, .controls, .pokemon-card.

Elementos: Ej. .pokedex__list, .header__title, .controls__input, .pokemon-card__name.

Modificadores: Ej. .controls__button--primary, .detail__favorite-button--favorited.

▶️ Cómo Iniciar el Proyecto
Clona o descarga este repositorio.

Abre el archivo index.html en tu navegador.

(Recomendado) Utiliza una extensión de servidor local (como Live Server de VS Code) para evitar problemas de CORS al cargar los archivos, especialmente si deseas probar la funcionalidad en tu dispositivo móvil.







