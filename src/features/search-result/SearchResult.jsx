import React, { Component } from 'react';
import SearchResultItem from '../../components/search-result-item/SearchResultItem';

class SearchResult extends Component {
  render() {
    const { results } = this.props;
    return (
      <div className='search-result-component'>
        {results &&
          results.map((result) => (
            <SearchResultItem key={result.id} result={result} />
          ))}
      </div>
    );
  }
}

export default SearchResult;
