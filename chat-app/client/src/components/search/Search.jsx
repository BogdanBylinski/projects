import React, { useContext } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import "./Search.scss";
import { UserContext } from "../../contexts/user.context";

import Hit from "../hit/Hit";
function Search({}) {
  const { currentUser } = useContext(UserContext);

  const searchClient = algoliasearch(
    "AA38X7CP42",
    "29e68feeb7edb28e1b3c1e22a9b020b5"
  );
  return (
    <div className="searchBox">
      <InstantSearch searchClient={searchClient} indexName="displayName">
        <SearchBox />
        <Hits filters={`objectID:${currentUser.uid}`} hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}

export default Search;
