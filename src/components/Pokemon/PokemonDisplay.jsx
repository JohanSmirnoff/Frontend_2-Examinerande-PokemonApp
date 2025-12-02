const PokemonDisplay = ({ monData, monList }) => {
    const getMonIndex = (url) => url.split("/")[6]
    if (!monData) {
        return (
            <div>
                <h4>Filtrerade Pokémon:</h4>
                <ul>
                    {monList.map((mon) => {
                        const id = getMonIndex(mon.url)
                        const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                        return <li key={mon.name} className="mon-frame">
                            <p>#{id}: {mon.name.replace(mon.name[0], mon.name[0].toUpperCase())}</p>
                            <img src={imgURL} alt={mon.name} />
                        </li>
                    })}
                </ul>
            </div>
        )
    }
    const id = getMonIndex(monData.species.url)
    return (
        <div className="chosen-mon">
            <h4>#{id}: {monData.name.replace(monData.name[0], monData.name[0].toUpperCase())}</h4>
            <img src={monData.sprites.front_default} alt={monData.name} />
            <p>Type: {monData.types.map(typeOfMon => typeOfMon.type.name.replace(typeOfMon.type.name[0], typeOfMon.type.name[0].toUpperCase())).join(" / ")}</p>
            <span className="height">Height: <span className="mon-height">{monData.height / 10} meters</span></span>
            <br />
            <span className="weight">Weight: <span className="mon-weight">{monData.weight / 10} kg</span></span>
        </div>
    )
    console.log("Letar efter rätt grejer i objektet lol", monData)
}

export default PokemonDisplay