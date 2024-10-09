import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails(){
    const {id} = useParams();
    const [pokemonDetails, setPokemonDetails] = useState({});
    
    async function getPokemonDetails(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        setPokemonDetails({
            name: response.data.name,
            image: (response.data.sprites.other) ? response.data.sprites.other.dream_world.front_default : response.data.sprites.front_shiny,
            type: response.data.types.map((t) => t.type.name),
            weight: response.data.weight,
            height: response.data.height,
        })
    }

    useEffect(()=>{
        getPokemonDetails();
    }, []);

    return(
        <div className="pokemon-details-wrapper">
            <img src={pokemonDetails.image} alt={pokemonDetails.name} className="poke-img" /> 
            <div className="poke-name poke-details"><span>{pokemonDetails.name}</span></div>
            <div className="poke-weight poke-details">Weight: {pokemonDetails.weight}</div> 
            <div className="poke-height poke-details">Height: {pokemonDetails.height}</div>
            <div className="poke-type poke-details">
                {pokemonDetails.type && pokemonDetails.type.map((t) => <div key={t} className="poke-type">{t}</div>)}
            </div>
        </div>
    )
    
}

export default PokemonDetails;