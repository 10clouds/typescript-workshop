declare module 'howler' {
  export interface HowlerGlobal {
    /**
     * Set the global volume for all sounds, relative to their own volume.
     * 
     * @param {number} volume Volume from 0.0 to 1.0
     */
    volume(value: number): void;
  }

  export type Format = 'mp3' | 'ogg';

  export interface HowlOptions {
    src: string[];
    autoplay?: boolean;
    preload?: boolean;
    format?: Format[];
  }

  export class Howl {
    constructor(options: HowlOptions);

    state: () => 'unloaded' | 'loading' | 'loaded';
    load: () => void;
    play: () => void;
    playing: () => boolean;
    stop: () => void;
  }

  export const Howler: HowlerGlobal;
}
