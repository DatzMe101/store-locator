import React, { Component } from 'react';
import { Layout } from 'antd';

import Brand from '../features/brand/Brand';
import Search from '../features/search/Search';
import Map from '../features/map/Map';
import SearchResult from '../features/search-result/SearchResult';
import { haversineInKM } from '../utilities/math';
import { getStores } from '../services/stores';

import './main.scss';

const { Content } = Layout;

class Main extends Component {
  state = {
    stores: [],
    currentPosition: null,
    query: '',
    distance: '1',
    searchQuery: {
      distance: 1,
      query: '',
      stores: [],
    },
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      const currentPosition = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      this.setState({ currentPosition });
      this.getStores();
    });
  }

  async getStores() {
    const { data } = await getStores();
    const stores = this.mapStoreDistance(data);
    this.setState({ stores });
  }

  mapStoreDistance(data = []) {
    const stores = data.reduce((mappedStores, store) => {
      const { lat, lng } = this.state.currentPosition;
      const distance = haversineInKM(lat, lng, store.latitude, store.longitude);
      return [...mappedStores, { ...store, distance }];
    }, []);
    return stores;
  }

  onSearch() {
    const { distance, query, stores } = this.state;
    const filteredStores = this.filterStores({ distance, query, stores });
    const searchQuery = { distance, query, stores: filteredStores };
    this.setState({ searchQuery });
  }

  filterStores({ distance, query, stores }) {
    const filteredStores = stores.filter((store) => {
      const isStoreInRange = store.distance <= parseInt(distance);
      if (!query || !isStoreInRange) return isStoreInRange;
      const isStoreQueried =
        store.name.toLowerCase().includes(query.toLowerCase()) ||
        store.tags.toLowerCase().includes(query.toLowerCase());
      return isStoreInRange && isStoreQueried;
    });
    return filteredStores;
  }

  onInputChange(event) {
    const stateKey = event.target.name;
    this.setState({ [stateKey]: event.target.value });
  }

  render() {
    return (
      <div className='main-layout'>
        <Content className='content'>
          <Brand />
          <Search
            query={this.state.query}
            distance={this.state.distance}
            onSubmit={() => {
              this.onSearch();
            }}
            onInputChange={(event) => this.onInputChange(event)}
          />
          <div className='search-content'>
            <Map
              distance={this.state.searchQuery.distance}
              stores={this.state.searchQuery.stores}
              currentPosition={this.state.currentPosition}
            ></Map>
            <SearchResult
              results={this.state.searchQuery.stores}
            ></SearchResult>
          </div>
        </Content>
      </div>
    );
  }
}

export default Main;
