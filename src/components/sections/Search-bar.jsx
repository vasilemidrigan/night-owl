import searchIcon from "../../assets/img/icon-search.svg";

export default function SearchBar() {
  return (
    <div className="SearchBar wrppr-mrgn-mob">
      <img src={searchIcon} className="SearchBar__icon" alt="search icon" />
      <input
        type="search"
        className="SearchBar__input"
        placeholder="Search from movies and TV series"
      />
    </div>
  );
}
