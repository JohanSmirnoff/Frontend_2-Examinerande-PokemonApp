import { useState, useEffect  } from "react"
// import Pokemon from "./Pokemon/Pokemon.jsx"


// const [showPokemonApplication, setShowPokemonApplication] = useState(false)

const MonApp = () => {
    const [monList, setPokemonList] = useState([])
    const [selectedMon, setSelectedMon] = useState("")
    const [monData, setMonData] = useState(null)

    useEffect(() => {
        const getPokemon = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            const data = await response.json()
            console.log(data)
            console.log(data.results)
            setPokemonList(data.results)
        }
        getPokemon()
    }, [])

    const showMon = async () => {
        if (!selectedMon) return
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedMon}`)
        const data = await response.json()
        setMonData(data)
        console.log(data)
    }

    return(
        <main>
            <div>
                <h3>
                    Här är listan med alla pokemon, sök på antingen namn eller index 
                </h3>
            </div>
        </main>
    )
}







export default MonApp