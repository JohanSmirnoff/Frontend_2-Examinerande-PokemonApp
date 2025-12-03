import { useState, useEffect  } from "react"
import PokemonDisplay from "../PokemonDisplay/PokemonDisplay"

const monAPI = "https://pokeapi.co/api/v2/pokemon"

const MonApp = () => {
    const [monList, setMonList] = useState([])
    const [selectedMon, setSelectedMon] = useState("")
    const [monStats, setMonStats] = useState(null)
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        const getAPI = async () => {
            const response = await fetch(`${monAPI}?limit=151`)
            const data = await response.json()
            setMonList(data.results)
        }
        getAPI()
    }, [])

    // filterMon används för att kolla i hela listan monList från API, även sökning
    const filterMon = monList.filter((mon, index) => {
        const nameSearch = mon.name.toLowerCase().includes(searchInput.toLowerCase())
        const numberSearch = (index + 1).toString().includes(searchInput)
        return nameSearch || numberSearch
    })

    const getMon = async (monKey) => {   //monKey lmao
        if (!monKey) return
        try {
            const response = await fetch(`${monAPI}/${monKey.toLowerCase()}`)
            if (!response.ok) {
                console.log("Ingen pokemon hittad i getMon bre", monKey, "Statuuus: ", response.status)
                setMonStats(null)
                return
            }
            const data = await response.json()
            setMonStats(data)
        } catch (error) {
            alert("Något gick fel...")
            console.error("Knas bror... Error: ", error)
        }
    }

    // Hitta och visa rätt pokemon
    const searchForMon = () => {
        const trimmedInput = searchInput.trim().toLowerCase()
        if (!trimmedInput) return 
        const num = Number(trimmedInput)
        if (!Number.isNaN(num)) {
            const index = num - 1
            if (index >= 0 && index < monList.length) {
                const mon = monList[index]
                setSelectedMon(mon.name)
                getMon(mon.name)
                return
            }
        }

        const monByName = monList.find(
            mon => mon.name.toLowerCase() === trimmedInput
        )
        if (monByName) {
            setSelectedMon(monByName.name)
            getMon(monByName.name)
            return
        }

        if (filterMon.length === 1) {
            const mon = filterMon[0]
            setSelectedMon(mon.name)
            getMon(mon.name)
            return
        } else if (filterMon.length > 1) {
            alert("Fler än en Pokémon hittades, skriv in ett helt namn, nummer eller välj från listan.")
            return
        } else {
            alert(`Ingen Pokémon hittades med: ${searchInput}`)
            return
        }
    }
    
    // Söka med enter, använder searchForMon
    const searchWithEnter = (e) => {
        if (e.key !== "Enter") return
        searchForMon()
    }
    
    // Visa vald mon vid knapptryck
    const clickOnMon = (clickedMon) => {
        setSelectedMon(clickedMon)
        getMon(clickedMon)
    }
    
    // Funktion för tillbaka-knapp
    const backToList = () => {
        setSearchInput("")
        setSelectedMon("")
        setMonStats(null)
    }

    return(
        <main>
            <section className="search-container">
                <div className="h2-container">
                    <h2>
                        Sök efter de 151 första Pokémon på antingen namn, index eller välj från listan.
                    </h2>
                </div>
                <div className="user-input">
                    <input className="search-field"
                        type="text"
                        placeholder="Sök här (namn eller nummer)..."
                        value={searchInput}
                        onChange={(e) => {
                            const value = e.currentTarget.value
                            setSearchInput(value)
                            setSelectedMon("")
                            }
                        }
                        onKeyDown={searchWithEnter}/>
                    <select name="mon"
                        className="drop-down"
                        value={selectedMon}
                        onChange={(e) => {
                            const value = e.target.value
                            setSelectedMon(value)
                            setSearchInput("")
                            getMon(value)
                            }
                        }>
                            <option value="">Eller välj från listan...</option>
                        {monList.map((mon, index) => (
                            <option key={mon.name} value={mon.name}>
                                #{index + 1}: {mon.name.replace(mon.name[0], mon.name[0].toUpperCase())}
                            </option>
                            ))}
                    </select>
                </div>
            </section>
                    <PokemonDisplay monData={monStats} monList={filterMon} clickMon={clickOnMon} backFromMon={backToList}/>
        </main>
    )
}

export default MonApp