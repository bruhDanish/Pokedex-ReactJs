import "./Search.css";

function Search(){
    return (
        <div className="search-wrapper">
            <input 
                type="text"
                placeholder="Search Pokemon"
                id="poke-name-search"
            />
        </div>
    )
}

export default Search;