const BtnBuscar = document.getElementById("BtnBuscar");
const InpTxt = document.getElementById("InpTxt");
const cardContainer = document.querySelector(".card-container");
const Smallmgs = document.querySelector(".mgs");

const getPoliwrath = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    showError(`Error al buscar :${error} `);
  }
};

/*Lo mínimo que deberá tener la card es el nombre, su tipo principal (pueden intentar poner todos) , su altura y peso (expresada en metros y kilogramos, tendrán que dividir el alto y peso que les llegue por 10), y una de sus imágenes.* */
const pokemonData = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name.toUpperCase(),
    image: pokemon.sprites.other.home.front_default,
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    // types: pokemon.types,
    experience: pokemon.base_experience,
    types: pokemon.types.map((type) => type.type.name),
  };
};
const createTypeCards = (types) => {
  return types
    .map((tipo) => {
      return `<p>Tipo : ${tipo.type.name}</p>`;
    })
    .join("");
};
const templatePokemon = (pokemon) => {
  const { name, sprites, types, height, weight } = pokemon;
  pokemonData(pokemon);
  const pokemonHTML = `
        <div class="card">
            <img src="${sprites.other.home.front_default}" alt="${name}">
            <h2>${name}</h2>
            <div class="card-altWd">
              <p>Alto: ${height} m</p>
              <p>Ancho: ${weight} kg</p>
             </div>
               ${createTypeCards(types)}

        </div>
    `;
  cardContainer.innerHTML = pokemonHTML;
};

const renderPokemon = async (id) => {
  try {
    const pokemon = await getPoliwrath(id);
    templatePokemon(pokemon);
  } catch (error) {
    console.log(error);
  }
};
const isEmptyInput = () => {
  return InpTxt.value.trim() === "";
};

// Funcion si no existe la city
const isInvaliPoke = (pokeapi) => {
  console.log("llego");
  return !pokeapi.id;
};
/* Con el número que se ponga, hacer una llamada a la pokeapi y renderizar una card con los datos del Pokémon encontrado.*/

const showError = (message) => {
  Smallmgs.textContent = message;
};
const searchPokemon = async () => {
  Smallmgs.textContent = "";
  //   Validacion si el input está vacio
  if (isEmptyInput()) {
    showError("Por favor, ingrese un número");
    return;
  }

  // Fetch a la ciudad si el input no está vacío
  const fetchedPoke = await getPoliwrath(InpTxt.value);

  //  Validamos que exista la ciudad
  if (isInvaliPoke(fetchedPoke)) {
    showError("Pokemon no encontrado");

    return;
  }
  renderPokemon(InpTxt.value);
};

const init = () => {
  BtnBuscar.addEventListener("click", searchPokemon);
};

init();
