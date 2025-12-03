const PokemonDisplay = ({ monData, monList, clickMon, backFromMon }) => {

    const bigLetter = (pokeText) => pokeText.replace(pokeText[0], pokeText[0].toUpperCase())
    const getMonIndex = (url) => url.split("/")[6]

    if (!monData) {
        return (
            <div>
                <ul className="poke-list">
                    {monList.map((mon) => {
                        const id = getMonIndex(mon.url)
                        const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                        return <li key={mon.name} className="mon-frame" onClick={() => clickMon && clickMon(mon.name)}>
                            <p><strong>#{id}: {bigLetter(mon.name)}</strong></p>
                            <img className="poke-pic" src={imgURL} alt={mon.name} height={120} width={120} />
                        </li>
                    })}
                </ul>
            </div>
        )
    }

    if ( monData) console.log("Letar efter rätt grejer i objektet lol", monData)

    const id = getMonIndex(monData.species.url)
    return (
        <div className="chosen-mon">
            <div className="info-container chosen-name">
                <h4>#{id}: {bigLetter(monData.name)}</h4>
                <img src={monData.sprites.front_default} alt={monData.name} className="chosen-mon-pic"/>
            </div>
            <div className="info-container">
                <p className="stat-info">Type: </p>
                <span>{monData.types.map(typeOfMon => bigLetter(typeOfMon.type.name)).join(" / ")}</span>
                <br />
                <span className="stat-text">Height: </span><span className="mon-height">{monData.height / 10} meters</span>
                <br />
                <span className="stat-text">Weight: </span><span className="mon-weight">{monData.weight / 10} kg</span>
            </div>
            <div className="info-container">
                <p className="stat-info">Stats: </p>
                {monData.stats.map((typeOfStat) => {
                    const statType = bigLetter(typeOfStat.stat.name)
                    const statNumber = typeOfStat.base_stat
                    return(
                        <div key={statType}>
                            <span className="stat-text">{statType}</span> - <span>{statNumber}</span>
                        </div>
                    )
                })}
            </div>
            <div>
                <button className="back-button" onClick={backFromMon}>Tillbaka</button>
            </div>
        </div>
    
    )
}

export default PokemonDisplay