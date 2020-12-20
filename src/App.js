import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "366e468a";
  const APP_KEY = "03d40771c5b40f6211fa6a4faf33d54d";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('')
  const [query,setQuery] = useState('')

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };
  const updateSearch= (e) =>{
    setSearch(e.target.value)
  }

  const getSearch = (e)=>{
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }


  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value = {search} onChange={updateSearch}/>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {recipes.map((recipe) => (
        <Recipe
        key= {recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
        />
      ))}
    </div>
  );
};

export default App;
