import * as React from 'react';
import { Component } from 'react';

import {TrackList} from './spotify/TrackList';
import {search, TrackData} from './spotify/api';

interface AppProps {}

interface AppState {
  query: string;
  results: TrackData[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      query: '',
      results: [],
    };

    this.queryChanged = this.queryChanged.bind(this);
  }

  componentDidMount() {
    this.updateResults(this.state.query);
  }

  queryChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    this.setState({query});
    this.updateResults(query);
  }

  async updateResults(query: string) {
    if (query) {
      const data = await search(query);
      const results = data.tracks.items;
      
      this.setState(
        (state) => state.query === query ? {results} : {}
      );
    } else {
      this.setState({results: []});
    }
  }

  render() {
    return (
      <div>
        <header>
          <input 
            type="text" 
            placeholder="Search" 
            value={this.state.query}
            onChange={this.queryChanged}
          />
        </header>
        <TrackList tracks={this.state.results}/>
      </div>
    );
  }
}

export default App;
