document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. SELECTORES DEL DOM
    // ----------------------------------------------------
    const $searchInput = document.getElementById('searchInput');
    const $searchButton = document.getElementById('searchButton');
    const $loadInitialButton = document.getElementById('loadInitialButton');
    const $pokemonList = document.getElementById('pokemonList');
    const $pokemonDetail = document.getElementById('pokemonDetail');
    const $favoritesList = document.getElementById('favoritesList');
    
    // ----------------------------------------------------
    // 2. CONFIGURACIÓN Y ESTADO
    // ----------------------------------------------------
    const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
    
    // Objeto de mapeo de tipos a colores para el CSS
    const TYPE_COLORS = {
        normal: '#A8A878', fire: '#F08030', water: '#6890F0', grass: '#78C850', 
        electric: '#F8D030', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0', 
        ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820', 
        rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', steel: '#B8B8D0', 
        dark: '#705848', fairy: '#EE99AC', unknown: '#68A090', shadow: '#4E2A84'
    };

    // ----------------------------------------------------
    // 3. GESTIÓN DE FAVORITOS (localStorage)
    // ----------------------------------------------------
    
    /**
     * Carga la lista de favoritos desde localStorage.
     * @returns {Array<string>} IDs/Nombres de los Pokémon favoritos.
     */
    const loadFavorites = () => {
        const favorites = localStorage.getItem('pokedexFavorites');
        return favorites ? JSON.parse(favorites) : [];
    };

    /**
     * Guarda la lista de favoritos en localStorage.
     * @param {Array<string>} favorites - La lista de favoritos actualizada.
     */
    const saveFavorites = (favorites) => {
        localStorage.setItem('pokedexFavorites', JSON.stringify(favorites));
    };

    /**
     * Marca o desmarca un Pokémon como favorito y actualiza localStorage.
     * @param {string} idOrName - ID o nombre del Pokémon.
     */
    const toggleFavorite = (idOrName) => {
        let favorites = loadFavorites();
        const index = favorites.indexOf(idOrName);

        if (index > -1) {
            favorites.splice(index, 1); // Desmarcar
        } else {
            favorites.push(idOrName); // Marcar
        }
        
        saveFavorites(favorites);
        renderFavoriteState(idOrName, index === -1); // Actualiza el botón de detalle
        renderFavoritesList(); // Actualiza la lista de favoritos
    };

    // ----------------------------------------------------
    // 4. FUNCIONES DE RENDERIZADO DEL DOM
    // ----------------------------------------------------

    /**
 /**
 * Crea y devuelve el HTML para una tarjeta de Pokémon para la lista.
 * @param {Object} pokemon - Objeto con datos básicos del Pokémon.
 * @returns {HTMLElement} El elemento div de la tarjeta.
 */
const createPokemonCard = (pokemon) => {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    
    // Extracción robusta del ID:
    // La URL tiene el formato "https://pokeapi.co/api/v2/pokemon/ID/"
    // Split por '/' y tomamos el elemento penúltimo (el ID).
    const segments = pokemon.url.split('/');
    const id = segments[segments.length - 2]; 
    
    // Usamos el ID como identificador para eventos
    card.dataset.idOrName = id || pokemon.name; 
    
    const defaultSpriteUrl = pokemon.spriteUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    card.innerHTML = `
        <img src="${defaultSpriteUrl}" alt="${pokemon.name}" class="pokemon-card__image" loading="lazy">
        <span class="pokemon-card__id">#${id}</span>
        <div class="pokemon-card__name">${pokemon.name}</div>
    `;
    
    // Si no hay ID (solo para lista principal que a veces no trae ID al inicio), usamos el nombre
    card.addEventListener('click', () => fetchPokemonDetail(id || pokemon.name));
    return card;
};

    /**
     * Renderiza una lista de Pokémon en un contenedor del DOM.
     * @param {Array<Object>} list - Lista de objetos de Pokémon (con nombre y URL).
     * @param {HTMLElement} container - El contenedor donde se insertarán las tarjetas.
     */
    const renderPokemonList = (list, container) => {
        container.innerHTML = ''; // Limpia el contenedor
        if (list.length === 0) {
            container.innerHTML = '<p class="pokedex__message">No se encontraron Pokémon.</p>';
            return;
        }

        list.forEach(pokemon => {
            container.appendChild(createPokemonCard(pokemon));
        });
    };

    
/**
 * Renderiza la lista de Pokémon favoritos.
 */
const renderFavoritesList = async () => {
    $favoritesList.innerHTML = '';
    const favorites = loadFavorites();

    if (favorites.length === 0) {
        $favoritesList.innerHTML = '<p class="pokedex__message">Aún no hay favoritos.</p>';
        return;
    }

    // Obtener el detalle de cada favorito para la tarjeta
    const favoritePromises = favorites.map(idOrName => 
        // Aseguramos que la petición sea por nombre o ID correcto
        fetch(POKEMON_API_URL + idOrName).then(res => {
            if (!res.ok) throw new Error(`Pokémon ${idOrName} no encontrado`);
            return res.json();
        })
    );
    
    try {
        const favoriteDetails = await Promise.all(favoritePromises);
        
        const favoriteCards = favoriteDetails.map(detail => ({
            name: detail.name,
            // CLAVE: Aseguramos que la URL termine en /ID/ para que la tarjeta lo extraiga
            url: POKEMON_API_URL + detail.id + '/', 
            spriteUrl: detail.sprites.front_default
        }));
        
        renderPokemonList(favoriteCards, $favoritesList);
        
    } catch (error) {
        console.error('Error al cargar detalles de favoritos:', error);
        $favoritesList.innerHTML = '<p class="pokedex__message">Error al cargar favoritos.</p>';
    }
};

    /**
     * Renderiza la información de detalle de un Pokémon.
     * @param {Object} data - Objeto de datos detallados del Pokémon desde la API.
     */
    const renderPokemonDetail = (data) => {
        const isFavorite = loadFavorites().includes(data.id.toString());

        // 2. DETALLE DEL POKÉMON: Estadísticas y Tipos
        const statsHtml = data.stats.map(stat => `
            <div class="detail__stat-item">
                <div class="detail__stat-name">${stat.stat.name.replace('special-', 'sp. ')}</div>
                <div class="detail__stat-value">${stat.base_stat}</div>
            </div>
        `).join('');

        const typesHtml = data.types.map(typeInfo => {
            const typeName = typeInfo.type.name;
            const typeColor = TYPE_COLORS[typeName] || '#68A090'; // Color por defecto si no existe
            return `<li class="detail__type" style="background-color: ${typeColor};">${typeName}</li>`;
        }).join('');

        // 2. DETALLE DEL POKÉMON: Estructura principal
        $pokemonDetail.innerHTML = `
            <div class="detail" data-id="${data.id}">
                <header class="detail__header">
                    <h2 class="detail__name">${data.name} (#${data.id})</h2>
                    <button class="detail__favorite-button detail__favorite-button--${isFavorite ? 'favorited' : 'unfavorited'}" 
                            data-id-or-name="${data.id}" title="Marcar como favorito">
                        ${isFavorite ? '★' : '☆'}
                    </button>
                </header>
                <img src="${data.sprites.other['official-artwork'].front_default}" alt="Imagen de ${data.name}" class="detail__image">
                
                <div class="detail__info">
                    <span><span class="detail__info-label">Altura:</span> ${data.height / 10} m</span>
                    <span><span class="detail__info-label">Peso:</span> ${data.weight / 10} kg</span>
                </div>
                
                <ul class="detail__types-list">
                    ${typesHtml}
                </ul>
                
                <h3 class="pokedex__heading">Estadísticas Base</h3>
                <div class="detail__stats">
                    ${statsHtml}
                </div>
            </div>
        `;
        
        // 3. GESTIÓN DE FAVORITOS: Evento para el botón de detalle
        const $favButton = $pokemonDetail.querySelector('.detail__favorite-button');
        if ($favButton) {
            $favButton.addEventListener('click', () => {
                toggleFavorite($favButton.dataset.idOrName);
            });
        }
    };

    /**
     * Actualiza el estado visual del botón de favorito en la sección de detalle.
     * @param {string} idOrName - ID o nombre del Pokémon.
     * @param {boolean} isFavorited - Si está marcado como favorito.
     */
    const renderFavoriteState = (idOrName, isFavorited) => {
        const $favButton = $pokemonDetail.querySelector(`.detail__favorite-button[data-id-or-name="${idOrName}"]`);
        if ($favButton) {
            $favButton.textContent = isFavorited ? '★' : '☆';
            $favButton.classList.toggle('detail__favorite-button--favorited', isFavorited);
            $favButton.classList.toggle('detail__favorite-button--unfavorited', !isFavorited);
        }
    };

    // ----------------------------------------------------
    // 5. CONSUMO DE API (Fetch API)
    // ----------------------------------------------------
    
    /**
     * Consulta la PokéAPI para obtener el detalle de un Pokémon y lo renderiza.
     * @param {string} idOrName - ID o nombre del Pokémon (en minúsculas).
     */
    const fetchPokemonDetail = async (idOrName) => {
        $pokemonDetail.innerHTML = '<p class="pokedex__message">Cargando...</p>';
        try {
            const response = await fetch(POKEMON_API_URL + idOrName.toLowerCase());
            if (!response.ok) {
                if (response.status === 404) {
                    $pokemonDetail.innerHTML = '<p class="pokedex__message">Pokémon no encontrado. Inténtalo de nuevo.</p>';
                    return;
                }
                throw new Error('Error en la API');
            }
            const data = await response.json();
            renderPokemonDetail(data);
        } catch (error) {
            console.error('Error al obtener detalle:', error);
            $pokemonDetail.innerHTML = '<p class="pokedex__message">Error al cargar los datos del Pokémon.</p>';
        }
    };

    /**
     * Consulta la PokéAPI para obtener una lista inicial de Pokémon.
     * @param {number} limit - El número de Pokémon a cargar.
     */
    const fetchInitialPokemon = async (limit = 20) => {
        $pokemonList.innerHTML = '<p class="pokedex__message">Cargando lista inicial...</p>';
        try {
            const response = await fetch(`${POKEMON_API_URL}?limit=${limit}`);
            if (!response.ok) throw new Error('Error al cargar la lista');
            
            const data = await response.json();
            // La API de lista solo da nombre y URL, no el sprite, por lo que usamos la URL.
            renderPokemonList(data.results, $pokemonList);
        } catch (error) {
            console.error('Error al obtener lista inicial:', error);
            $pokemonList.innerHTML = '<p class="pokedex__message">Error al cargar la lista de Pokémon.</p>';
        }
    };

    // ----------------------------------------------------
    // 6. MANEJO DE EVENTOS
    // ----------------------------------------------------

    // 1. Requerimiento: Botón de cargar iniciales
    $loadInitialButton.addEventListener('click', () => {
        fetchInitialPokemon(20);
    });

    // 1. Requerimiento: Campo y botón de búsqueda
    const handleSearch = () => {
        const query = $searchInput.value.trim();
        if (query) {
            fetchPokemonDetail(query);
            // Opcional: limpiar la lista general al buscar un solo detalle
            $pokemonList.innerHTML = '<p class="pokedex__message">Resultado de búsqueda: Ver detalles.</p>';
        } else {
            alert('Por favor, introduce un nombre o ID para buscar.');
        }
    };

    $searchButton.addEventListener('click', handleSearch);
    $searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // ----------------------------------------------------
    // 7. INICIALIZACIÓN DE LA APLICACIÓN
    // ----------------------------------------------------
    const initialize = () => {
        // Carga la lista de favoritos al inicio
        renderFavoritesList(); 
        
        // Carga la lista inicial de Pokémon
        fetchInitialPokemon(20);
    };

    initialize();
});