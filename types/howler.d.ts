declare module 'howler' {
    export namespace Howl {
        export type Format = 'mp3' | 'ogg';
        export type State = 'unloaded' | 'loading' | 'loaded';

        export interface Options {
            /**
             * The sources to the track(s) to be loaded for the sound 
             * (URLs or base64 data URIs). These should be in order of 
             * preference, howler.js will automatically load the first 
             * one that is compatible with the current browser. 
             * 
             * If your files have no extensions, you will need to explicitly 
             * specify the extension using the format property.
             * 
             * @type {string[]}
             */
            src: string[];

            /**
             * Set to true to automatically start playback when sound is loaded.
             * 
             * @type {boolean}
             */
            autoplay?: boolean;

            /**
             * Automatically begin downloading the audio file when the Howl 
             * is defined.
             * 
             * @type {boolean}
             */
            preload?: boolean;

            /**
             * howler.js automatically detects your file format from 
             * the extension, but you may also specify a format in situations 
             * where extraction won't work (such as with a SoundCloud stream).
             * 
             * @type {Format[]}
             */
            format?: Format[];
        }
    }

    /**
     * Class for playing sounds from a url
     */
    export class Howl {
        /**
         * Creates an instance of Howl.
         * @param {Howl.Options} options 
         */
        constructor(options: Howl.Options);

        /**
         * Check the load status of the Howl.
         * 
         * @returns {Howl.State} one of unloaded, loading or loaded
         */
        state(): Howl.State;

        /**
         * This is called by default, but if you set preload to false, 
         * you must call load before you can play any sounds.
         */
        load(): void;

        /**
         * Begins playback of a sound.
         */
        play(): void;

        /**
         * Check if the sound is currently playing or not. 
         * 
         * @returns {boolean} whether the sound is playing
         */
        playing(): boolean;

        /**
         * Stops playback of sound, resetting seek to 0.
         */
        stop(): void;
    }

    export interface HowlerGlobal {
        /**
         * Get the global volume for all sounds, relative to their own volume.
         * 
         * @returns {number} Volume from 0.0 to 1.0
         */
        volume(): number;

        /**
         * Set the global volume for all sounds, relative to their own volume.
         * 
         * @param {number} volume Volume from 0.0 to 1.0
         */
        volume(volume: number): void;
    }

    export const Howler: HowlerGlobal;
}
