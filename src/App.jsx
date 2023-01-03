// imports
import Navbar from "./components/sections/Navbar";
import SearchBar from "./components/sections/Search-bar";
import HomePage from "./components/pages/Home-page";
import TrendingBar from "./components/sections/Trending-bar";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchBar />
      <TrendingBar />
      <HomePage />
    </div>
  );
}
