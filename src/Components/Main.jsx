import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokemon from "./Pokemon";
import axios from "axios";
import Searchbox from "./Searchbox";
import { logDOM } from "@testing-library/react";

function Main() {
  const [pokedata, setpokedata] = useState([])
  const [searchfield,setSearchfield]=useState("")
  const [loading, setloading] = useState(true)
  const [url, seturl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nexturl, setnexturl] = useState();
  const [preurl, setpreurl] = useState();
  const [pokedex, setpokedex] = useState();
  // const [ogdata, setogdata] = useState();
  
   const searchpoke = (event) => {
    setSearchfield(event.target.value)
    const fliterdpok = pokedata.filter(pok => {
      return pok.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    setpokedata(fliterdpok);
    }



  const PokeFun = async () => {
    setloading(true);
    const res = await axios.get(url);
    // console.log(res.data.results);
    setnexturl(res.data.next);
    setpreurl(res.data.previous);
    getpokemon(res.data.results);
    setloading(false)
  }
  const getpokemon=async(res)=> {
    res.map(async(item)=> {
      const result = await axios.get(item.url)
      //console.log(result)
      setpokedata(r => {
        r = [...r, result.data]
        r.sort((a,b)=>a.id>b.id?1:-1)
        return r;
      })
      // setogdata(r => {
      //   r = [...r, result.data]
      //   r.sort((a,b)=>a.id>b.id?1:-1)
      //   return r;
      // })
    })
}




  useEffect(() => {
    PokeFun();
  },[url])
  return (
    <>
      
      <div className="headiamge">
        <img src="ttps://assets.stickpng.com/images/612ce4761b9679000402af1c.png" alt="" />
      </div>
      <Searchbox searching={searchpoke} />
      <div className="container">
        <div className="leftside">
          
          <Card pokemon={pokedata} loading={ loading} infoPokemon={poke=>setpokedex(poke)} />
          
          
          <div className="btn-group">
            {preurl && <button onClick={() => {
              setpokedata([])
              seturl(preurl)
            }}>Previous</button>}
            <button onClick={() => {
              setpokedata([])
              seturl(nexturl)
            }}>Next</button>
          </div>
        </div>
              <div className="rightside">
          <Pokemon data={pokedex} />
        </div>
      </div>
    </>
  );
}

export default Main;
