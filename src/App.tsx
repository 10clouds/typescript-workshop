import * as React from 'react';
import { Component } from 'react';

import {TrackList} from './spotify/TrackList';
import {SpotifyTrackSearch, TrackData, Direction} from './spotify/api';
import {Pagination} from "./spotify/Pagination";

interface AppProps {}

interface AppState {
  query: string;
  results: TrackData[];
}

class App extends Component<AppProps, AppState> {
  searchTracks = new SpotifyTrackSearch();

  constructor(props: AppProps) {
    super(props);

    this.state = {
      query: '',
      results: [],
    };

    this.queryChanged = this.queryChanged.bind(this);
    this.isDirectionHidden = this.isDirectionHidden.bind(this);
  }

  componentDidMount() {
    this.updateResults(this.state.query);
  }

  queryChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    this.setState({query});
    this.updateResults(query);
  }

  async updateResults(query: string, direction?) {
    if (query) {
      const data = await this.searchTracks.search(query, direction);
      const results = data.tracks.items;
      
      this.setState(
        (state) => state.query === query ? {results} : {}
      );
    } else {
      this.setState({results: []});
    }
  }

  isDirectionHidden(direction: Direction) {
    if (!this.state.query) {
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
          hideNext={this.isDirectionHidden(Direction.Next)}
          hidePrevious={this.isDirectionHidden(Direction.Previous)}
        />
      </div>
    );
  }
}

export default App;
