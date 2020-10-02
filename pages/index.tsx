import React, { useEffect, useState } from 'react'
import Head from 'next/head'

interface Pokemon {
  name: string
  url: string
}

interface PokemonProps {
  entry_number: number
  pokemon_species: Pokemon
}

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonProps[]>([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokedex/2/')
      .then(responseServer => {
        if (responseServer.ok) {
          return responseServer.json()
        }
      })
      .then(responseObject => {
        setPokemons(responseObject.pokemon_entries)
      })
  }, [])

  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>
      <h1>Pokedex Kanto</h1>
      <ul>
        {pokemons.map(pokemon => {
          return (
            <li key={pokemon.entry_number}>{pokemon.pokemon_species.name}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
