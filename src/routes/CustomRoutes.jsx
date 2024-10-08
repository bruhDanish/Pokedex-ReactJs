import {Routes, Route} from 'react-router-dom';
import Pokedex from '../Components/Pokedex/Pokedex';
import PokemonDetails from '../Components/PokemonDetails/PokemonDetails';

function CustomRoutes(){
    return(
        <Routes>
            <Route path='/pokemon' element={<Pokedex />}/>
            <Route path='/pokemon/2' element={<PokemonDetails />} />
        </Routes>
    )
}

export default CustomRoutes;