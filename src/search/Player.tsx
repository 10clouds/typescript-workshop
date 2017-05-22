import * as React from 'react';
import {Component} from 'react';
import {Howl, Howler} from 'howler';

Howler.volume(0.1);

interface PlayerProps {
  src: string;
}

interface PlayerState {
  isPlaying: boolean;
}

export class Player extends Component<PlayerProps, PlayerState> {
  private howl: Howl;
  private static activePlayer: Player | undefined;

  constructor(props: PlayerProps) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this.toggle = this.toggle.bind(this);
    this.howl = new Howl({
      src: [props.src],
      autoplay: false,
      preload: false,
      format: ['mp3'],
    });
  }

  stop() {
    this.howl.stop();
    this.setState({isPlaying: false});

    if (Player.activePlayer === this) {
      Player.activePlayer = undefined;
    }
  }

  play() {
    if (Player.activePlayer && Player.activePlayer !== this) {
      Player.activePlayer.stop();
    }

    if (this.howl.state() === 'unloaded') {
      this.howl.load();
    }

    this.howl.play();
    this.setState({isPlaying: true});
    Player.activePlayer = this;
  }

  toggle() {
    if (this.howl.playing()) {
      this.stop();
    } else {
      this.play();
    }
  }

  render() {
    return (
      <button 
        type="button"
        className="play-button"
        onClick={this.toggle}
        title={this.state.isPlaying ? 'stop' : 'play'}
      >
        <span className={
          this.state.isPlaying ? 'fa fa-stop' : 'fa fa-play'
        }/>
      </button>
    );
  }

  componentWillUnmount() {
    this.stop();
  }
}
