import { Link } from "react-router-dom"

const HomePage = () => {
    return(
        <header>
            <div>
                <h1>
                    Sho och välkommen till en fantastiskt värld av Pokémons! Tryck på knappen nedan för att hitta din favorit...
                </h1>
                <Link to="./PokeApp">
                    <button type="button">Kom igång här!</button>
                </Link>
            </div>
        </header>
    )
}

export default HomePage