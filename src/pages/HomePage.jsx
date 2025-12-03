import { Link } from "react-router-dom"

const Home = () => {
    return(
        <main>
            <div className="home-div">
                <h1 className="home-h1">
                    Sho och välkommen till en fantastiskt värld av Pokémon! Tryck på knappen nedan för att hitta din favorit...
                </h1>
                <Link to="./PokeAppPage" className="start-link">
                    <button type="button" className="start-button">Starta app!</button>
                </Link>
            </div>
            <div className="logo-container">
                <img src="../public/mon_logo.svg" alt="mon_logo" id="mon-logo" />
            </div>
        </main>
    )
}

export default Home