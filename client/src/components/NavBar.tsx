import "../sass/layout.scss"
function NavBar(): JSX.Element {
    return (
        <div className="nav-container">
            <h1 id="nav-title">MealMingle </h1>
            <nav>
                <div className="nav-item">
                    <h3>Recipes</h3>
                </div>
                <div className="nav-item">
                    <h3>Community</h3>
                </div>
                <div className="nav-item">
                    <h3>Shop</h3>
                </div>
                <div className="nav-item">
                    <h3>Profile</h3>
                </div>
            </nav>
            <div className="search-container">
                <button><i className="fi fi-rr-search-heart"></i></button>
                <input id="search"/>

            </div>
        </div>
    )
}

export  default NavBar;