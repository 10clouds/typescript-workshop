declare module 'howler' {
  interface HowlOptions {
    /**
     * The sources to the track(s) to be loaded for the sound (URLs or base64 data URIs). These should be in order of preference, howler.js will automatically load the first one that is compatible with the current browser. If your files have no extensions, you will need to explicitly specify the extension using the format property.
     */
    src: string[];
    /**
     * Set to true to automatically start playback when sound is loaded.
     */
    autoplay?: boolean;
    /**
     * Automatically begin downloading the audio file when the Howl is defined.
     */
    preload?: boolean;
    /**
     * howler.js automatically detects your file format from the extension, but you may also specify a format in situations where extraction won't work (such as with a SoundCloud stream).
     */
    format?: string[];
  }

  interface HowlerGlobal {
    /**
     * Get/set the global volume for all sounds, relative to their own volume.
     */
    volume(volume?: number);
  }

  export class Howl {
    constructor(options: HowlOptions);

    /**
     * Check the load status of the Howl, returns a unloaded, loading or loaded.
     */
    state(): 'unloaded' | 'loading' | 'loaded';
    /**
     * Begins playback of a sound.
     */
    play(): void;
    /**
     * Stops playback of a sound, resetting seek to 0.
     */
    stop(): void;
    /**
     * Check if a sound is currently playing or not, returns a Boolean.
     */
    playing(): boolean;
    /**
     * This is called by default, but if you set preload to false, you must call load before you can play any sounds. 
     */
    load(): void;
  }

  export const Howler: HowlerGlobal;
}