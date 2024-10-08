import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pokedexUrl, setPokedexUrl] =  useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemon() {
        setLoading(true);
        const response = await axios.get(pokedexUrl); //this downloads the list of 20 pokemons

        const pokemonResults = response.data.results; //we get array of pokemons from result
        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        
        /* iterating over the arrayof pokemons, and using their url, to create an array of promises
            which will be used to download the data of each pokemon
        */
        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        //passing the array of promises to axios.all, which will download the data of all pokemons
        const pokemonData = await axios.all(pokemonResultsPromise);//array of 20 pokemons' detailed data
        console.log(pokemonData);

        //now we will iterate over the array of 20 pokemons' detailed data, and extract the required data i.e. id, name, image, type
        const pokeListRes = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                type: pokemon.types
            }
        });
        console.log(pokeListRes);
        setPokemonList(pokeListRes);
        setLoading(false);        
    }

    useEffect(() => {
        downloadPokemon();
    }, [pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {(loading) ? 'Loading....' : 
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div className="controls ">
                <button className="btns" disabled={prevUrl === null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button className="btns" disabled={nextUrl === null} onClick={() => setPokedexUrl(nextUrl   )}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;