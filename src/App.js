import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonListPage from "./components/PokemonListPage";



function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/pokemons">
            <PokemonListPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;