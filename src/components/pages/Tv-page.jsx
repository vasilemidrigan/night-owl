// -------
// Tv page
// -------

// react
import { useContext } from "react";
// context
import { TvDataContext } from "../../context/Context-Config";
import { ConfigsDataContext } from "../../context/Context-Config";
// components
import ShowsRow from "../ui/ShowsRow";

export default function TvPage() {
  const configs = useContext(ConfigsDataContext);
  const tv = useContext(TvDataContext);
  const popularTv = tv.popularTv;
  const topRatedTv = tv.topRatedTv;
  const airingTodayTv = tv.airingTodayTv;
  const onTheAirTv = tv.onTheAirTv;

  return (
    <div className="TvPage wrppr-mrgn-mob">
      <h1 className="pg-hdr fnt-hdr-l">Tv Shows</h1>
      <ShowsRow
        configs={configs}
        shows={popularTv}
        showsCategory={"Popular Tv Shows"}
        collectionID={"popular_tv"}
      />
      <ShowsRow
        configs={configs}
        shows={topRatedTv}
        showsCategory={"Top Rated Tv Shows"}
        collectionID={"top_rated_tv"}
      />
      <ShowsRow
        configs={configs}
        shows={airingTodayTv}
        showsCategory={"Airing Today Tv Shows"}
        collectionID={"airing_today_tv"}
      />
      <ShowsRow
        configs={configs}
        shows={onTheAirTv}
        showsCategory={"On The Air Tv Shows"}
        collectionID={"on_the_air_tv"}
      />
    </div>
  );
}
