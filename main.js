const BtnBuscar = document.getElementById("BtnBuscar");
const InpTxt = document.getElementById("InpTxt");
const cardContainer = document.querySelector(".card-container");

const getPoliwrath = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
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
    types: pokemon.types.map((type) => type.name),
  };
};
const templatePokemon = (pokemon) => {
  const { name, sprites, types, height, weight } = pokemon;
  pokemonData(pokemon);
  const pokemonHTML = `
        <div class="card">
            <img src="${sprites.other.home.front_default}" alt="${name}">
            <h2>${name}</h2>
            <p>Alto: ${height} m</p>
            <p>Ancho: ${weight} kg</p>
            <p>Tipos: ${types.join(", ")}</p>S
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
const isInvaliPoke = (pokeapi) => !pokeapi.id;
/* Con el número que se ponga, hacer una llamada a la pokeapi y renderizar una card con los datos del Pokémon encontrado.*/

const searchCity = async (e) => {
  debugger;

  //   Validacion si el input está vacio
  if (isEmptyInput()) {
    alert("Debes ingresar una ciudad");
    return;
  }

  // Fetch a la ciudad si el input no está vacío
  const fetchedPoke = await getPoliwrath(InpTxt.value);

  //  Validamos que exista la ciudad
  if (isInvaliPoke(fetchedPoke)) {
    alert("Pokemon no encontrado");
    InpTxt.value = "";
    return;
  }
  renderPokemon(InpTxt.value);
};

const init = () => {
  BtnBuscar.addEventListener("click", searchCity);
};

init();
