import { useState, useEffect  } from "react"
import PokemonDisplay from "../components/Pokemon/PokemonDisplay"

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
            console.log(data.results)
        }
        getAPI()
    }, [])

    const getMon = async (monKey) => {   //monKey lmao
        if (!monKey) return
        try {
            const response = await fetch(`${monAPI}/${monKey.toLowerCase()}`)
            if (!response.ok) {
                console.log("Ingen mon hittad", monKey, response.status)
                setMonStats(null)
                return
            }
            const data = await response.json()
            setMonStats(data)
            console.log({selectedMon})
            console.log("Test jaaow", data) 
        } catch (error) {
            alert("General knas")
            console.error("Knas bror", error)
        }
    }

    const showMon = async () => {
        getMon(selectedMon)
    }

    const filterMon = monList.filter((mon, index) => {
        const nameSearch = mon.name.toLowerCase().includes(searchInput.toLowerCase())
        const numberSearch = (index + 1).toString().includes(searchInput)
        return nameSearch || numberSearch
    })

    //Funktion för att först söka med enter
    const searchWithEnter = (e) => {
        if (e.key !== "Enter") return
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
            mon => mon.name.toLowerCase() === trimmedInput)
        
        if (monByName) {
            setSelectedMon(monByName.name)
            getMon(monByName.name)
            return
        }

    }

    return(
        <main>
            <section>
                <div>
                    <h2>
                        Sök efter de 151 första Pokémon på antingen namn, index eller välj från listan.
                    </h2>
                </div>
                <div>
                    <input className="search-field"
                    type="text"
                    placeholder="Sök här (namn eller nummer)..."
                    value={searchInput}
                    onChange={(e) => {
                        const value = e.currentTarget.value
                        setSelectedMon(value)
                        // getMon(value)
                        }
                    }
                    onKeyDown={searchWithEnter}/>
                </div>
                <div>
                    <select name="mon"
                    id="mon"
                    value={selectedMon}
                    onChange={(e) => setSelectedMon(e.target.value)}>
                        <option value="">Eller välj från listan...</option>
                    {monList.map((mon, index) => (
                        <option key={mon.name} value={mon.name}>
                            #{index + 1}: {mon.name.replace(mon.name[0], mon.name[0].toUpperCase())}
                        </option>
                        ))}
                    </select>
                    <button onClick={showMon} disabled={!selectedMon}>
                        Visa vald Pokémon
                    </button>
                    <button>
                        Rensaaaaaa 
                    </button>
                        <p>
                            {/* Du har valt: #{filterMon}<br />{mon.name} */}
                        </p>
                </div>
            </section>
            <article>
                <div>
                    <PokemonDisplay monData={monStats} monList={filterMon}/>
                </div>
            </article>
        </main>
    )
}




export default MonApp