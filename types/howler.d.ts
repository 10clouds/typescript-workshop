/**
 * howler.js is an audio library for the modern web. 
 * It defaults to Web Audio API and falls back to HTML5 Audio. 
 * This makes working with audio in JavaScript easy and reliable across all platforms.
 * Additional information, live demos and a user showcase are available at howlerjs.com.
 */
declare module 'howler' {

    /**
     * Howl options
     */
    interface Options {
        /**
         * The sources to the track(s) to be loaded for the sound (URLs or 
         * base64 data URIs). These should be in order of preference, howler.js 
         * will automatically load the first one that is compatible with 
         * the current browser. If your files have no extensions, you will need 
         * to explicitly specify the extension using the format property.
         */
        src: string[];
        
        /**
         * The volume of the specific track, from 0.0 to 1.0.
         */
        volume?: number;
        
        /**
         * Automatically begin downloading the audio file when the Howl is defined.
         */
        preload?: boolean;

        /**
         * Set to true to automatically start playback when sound is loaded.
         */
        autoplay?: boolean;

        /**
         * howler.js automatically detects your file format from the extension, 
         * but you may also specify a format in situations where extraction 
         * won't work (such as with a SoundCloud stream).
         */
        format?: string[];
    }

    /**
     * Howl load status
     */
    type State = 'unloaded' | 'loading' | 'loaded';

    /**
     * Represents a sound in howler
     */
    class Howl {
        /**
         * Creates a new sound
         * 
         * @param options sound options
         */
        constructor(options: Options);

        /**
         * Begins playback of a sound.
         */
        play(): void;
        
        /**
         * Stops playback of a sound, resetting seek to 0.
         */        
        stop(): void;

        /**
         * Check the load status of the Howl, returns a unloaded, loading or loaded.
         */
        state(): State;

        /**
         * Check if a sound is currently playing or not, returns a Boolean. 
         */
        playing(): boolean;
        
        /**
         * This is called by default, but if you set preload to false, 
         * you must call load before you can play any sounds.
         */        
        load(): void;
    }

    /**
     * Global howler functions interface
     */
    interface HowlerGlobal {
        /**
         * Get/set the global volume for all sounds, relative to their own volume.
         * 
         * @param volume Volume from 0.0 to 1.0
         */
        volume(volume?: number): void;
    }

    /**
     * Global howler functions
     */
    const Howler: HowlerGlobal;
}
