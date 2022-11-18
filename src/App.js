import { useEffect, useState } from "react";
import PokeomnList from "./PokeomnList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
    let cancel
      axios.get(currentPageUrl,{
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
      .then(res => {
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p.name))
      })

      return () => cancel()

  },[currentPageUrl])

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."


  return (
    <>
      <PokeomnList pokemon={pokemon} />
      <Pagination 
      gotoNextPage={nextPageUrl ? gotoNextPage : null}
      gotoPrevPage={prevPageUrl ? gotoPrevPage : null}/> 
    </>
  );
}

export default App;
