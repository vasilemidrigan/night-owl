// Shows Row

export default function ShowsRow(props) {
  console.log(props);

  return (
    <div className="ShowsRow">
      {props.popularMovies.map((show) => {
        return (
          <div className="ShowsRow_show" key={show.id}>
            <img
              src={`${props.configs[0]?.images.secure_base_url}${props.configs[0]?.images.profile_sizes[1]}${show.poster_path}`}
              className="TrendingBar__element__img"
              alt="Trending element image"
            />
          </div>
        );
      })}
    </div>
  );
}
