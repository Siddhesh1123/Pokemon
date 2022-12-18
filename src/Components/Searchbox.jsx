import React from "react";

const Searchbox = ({ searching }) => {
  return (
    <div className="tc pa2">
          <input
        onChange={searching}
        type="search"
        placeholder="Search Pokemons"
        className="bg-light-green  ba b--red  br-pill "
        style={{padding:"10px"}}
      />
    </div>
  );
};

export default Searchbox;
