import * as React from 'react';
import {Component} from 'react';

import {SpotifySearch, Direction, Track} from './spotifySearch';
import {TrackList} from './TrackList';
import {Pagination} from './Pagination';

interface SearchState {
  query: string;
  results: Track[];
  isRequestPending: boolean;
}

export class Search extends Component<{}, SearchState> {
  spotifySearch = new SpotifySearch();

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

  queryChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    this.setState({query});
    this.updateResults(query);
  }

  async updateResults(query: string, direction?: Direction) {
    if (!query) {
      this.setState({results: []});
      return;
    }

    this.setState({isRequestPending: true});

    const data = await this.spotifySearch.search(query, direction);
    const results = data.tracks!.items;

    this.setState(
      (state) => ({
        // prevent from race when older query takes longer and overrides lastest
        results: state.query === query ? results : state.results,
        isRequestPending: false,
      })
    );
  }

  isDirectionHidden(direction: Direction) {
    if (!this.state.query || this.state.isRequestPending) {
      return true;
    }

    return !this.spotifySearch.hasDirection(direction);
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
          onNext={() => this.updateResults(this.state.query, Direction.Next)}
          onPrevious={() => this.updateResults(this.state.query, Direction.Previous)}
          hideNext={this.isDirectionHidden(Direction.Next)}
          hidePrevious={this.isDirectionHidden(Direction.Previous)}
        />
      </div>
    );
  }
}
