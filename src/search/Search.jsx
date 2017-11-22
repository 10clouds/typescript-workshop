import React from 'react';
import {Component} from 'react';

import {TrackSearch} from './trackSearch';
import {TrackList} from './TrackList';
import {Pagination} from "./Pagination";

export class Search extends Component {
  searchTracks = new TrackSearch();

  constructor() {
    super();

    this.state = {
      query: '',
      results: [],
      isRequestPending: false,
    };

    this.queryChanged = this.queryChanged.bind(this);
    this.isDirectionHidden = this.isDirectionHidden.bind(this);
  }

  componentDidMount() {
    this.updateResults(this.state.query);
  }

  queryChanged(event) {
    const query = event.target.value;
    this.setState({query});
    this.updateResults(query);
  }

  async updateResults(query, direction) {
    if (!query) {
      this.setState({results: []});
      return;
    }

    this.setState({isRequestPending: true});

    const data = await this.searchTracks.search(query, direction);
    const results = data.tracks.items;

    this.setState(
      (state) => ({
        // prevent from race when older query takes longer and overrides lastest
        results: state.query === query ? results : state.results,
        isRequestPending: false,
      })
    );
  }

  isDirectionHidden(direction) {
    if (!this.state.query || this.state.isRequestPending) {
      return true;
    }

    return !this.searchTracks.hasDirection(direction);
  }

  render() {
    return (
      <div className='container'>
        <header className="app-header">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={this.state.query}
            onChange={this.queryChanged}
          />
        </header>
        <TrackList tracks={this.state.results}/>
        <Pagination
          onNext={() => this.updateResults(this.state.query, 1)}
          onPrevious={() => this.updateResults(this.state.query, -1)}
          hideNext={this.isDirectionHidden(1)}
          hidePrevious={this.isDirectionHidden(-1)}
        />
      </div>
    );
  }
}
