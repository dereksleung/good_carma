import React from "react";
import queryString from "query-string";
import UserResults from "./UserResults";

const SearchResults = (props) => {

  const queryObj = queryString.parse(props.location.search);
  const query = queryObj.query;

  return(
    <section className="SearchResults">
      <UserResults query={query} />
    </section>
  )
}

export default SearchResults;