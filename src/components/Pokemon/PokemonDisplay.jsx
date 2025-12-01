const PokemonDisplay = ({ monData, monList }) => {
    if (!monData) {
        return (
            <div>
                <h4>Alla Pokémon:</h4>
                <ul>
                    {monList.map((mon, index) => {
                        const id = index + 1
                        const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                        return <li key={index}>
                            <p>#{index + 1}: {mon.name.replace(mon.name[0], mon.name[0].toUpperCase())}</p>
                            <img src={imgURL} alt={mon.name} />
                        </li>
                    })}
                </ul>
            </div>
        )
    }
    return (
        <div className="chosen-mon">
            <h4>{monData.name.replace(monData.name[0], monData.name[0].toUpperCase())}</h4>
            <img src={monData.sprites.front_default} alt={monData.name} />
            <p>Type: {monData.types.map(typeOfMon => typeOfMon.type.name.replace(typeOfMon.type.name[0], typeOfMon.type.name[0].toUpperCase())).join(" / ")}</p>
            <span className="height">Height: <span className="mon-height">{monData.height / 10} meters</span></span>
            <br />
            <span className="weight">Weight: <span className="mon-weight">{monData.weight / 10} kg</span></span>    
        </div>
    )
}







export default PokemonDisplay