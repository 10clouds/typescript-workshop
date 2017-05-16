// howler.js 2.0.3 type definitions

declare module 'howler' {

    /** Sprite definition */
    type SpriteDef = 
        [number, number] |
        [number, number, boolean];

    /** Howler state names */
    type StateName = 
        'unloaded' | 
        'loading' | 
        'loaded';

    /** Howler event names */
    type EventName = 
        'load' |
        'loaderror' |
        'play' |
        'end' |
        'pause' |
        'stop' |
        'mute' |
        'volume' |
        'rate' |
        'seek' |
        'fade';

    type SpriteId = string;
    type SoundId = number;
    type Callback = (id: SoundId) => void;
    type Errback = (id: SoundId, error: string) => void;

    interface Options {
        /**
         * The sources to the track(s) to be loaded for the sound (URLs or 
         * base64 data URIs). 
         * These should be in order of preference, howler.js will 
         * automatically load the first one that is compatible with 
         * the current browser. 
         * If your files have no extensions, you will need to explicitly 
         * specify the extension using the format property.
         */
        src: string[];

        /** The volume of the specific track, from 0.0 to 1.0. */
        volume?: number;

        /**
         * Set to true to force HTML5 Audio. This should be used for 
         * large audio files so that you don't have to wait for the 
         * full file to be downloaded and decoded before playing.
         */
        html5?: boolean;

        /** Set to true to automatically loop the sound forever. */
        loop?: boolean;

        /**
         * Automatically begin downloading the audio file when 
         * the Howl is defined.
         */
        preload?: boolean;

        /** 
         * Set to true to automatically start playback when sound is loaded.
         */
        autoplay?: boolean;

        /**
         * Set to true to load the audio muted.
         */
        mute?: boolean;

        /**
         * Define a sound sprite for the sound. The offset and duration 
         * are defined in milliseconds. A third (optional) parameter 
         * is available to set a sprite as looping. 
         * An easy way to generate compatible sound sprites is with audiosprite.
         */
        sprite?: {[id: string]: SpriteDef};

        /**
         * The rate of playback. 0.5 to 4.0, with 1.0 being normal speed.
         */
        rate?: number;

        /**
         * The size of the inactive sounds pool. Once sounds are stopped 
         * or finish playing, they are marked as ended and ready for cleanup.
         * We keep a pool of these to recycle for improved performance.
         * Generally this doesn't need to be changed. It is important to 
         * keep in mind that when a sound is paused, it won't be removed 
         * from the pool and will still be considered active so that it 
         * can be resumed later.
         */
        pool?: number;

        /**
         * howler.js automatically detects your file format from the extension, 
         * but you may also specify a format in situations where extraction
         * won't work (such as with a SoundCloud stream).
         */
        format?: string[];

        /** Fires when the sound is loaded. */
        onload?: Callback;

        /** Fires when the sound is unable to load. */
        onloaderror?: Errback;

        /** Fires when the sound begins playing. */
        onplay?: Callback;

        /**
         * Fires when the sound finishes playing (if it is looping, 
         * it'll fire at the end of each loop).
         */
        onend?: Callback;

        /** Fires when the sound has been paused. */
        onpause?: Callback;

        /** Fires when the sound has been stopped. */
        onstop?: Callback;

        /** Fires when the sound has been muted/unmuted. */
        onmute?: Callback;

        /** Fires when the sound's volume has changed. */
        onvolume?: Callback;

        /** Fires when the sound's playback rate has changed. */
        onrate?: Callback;

        /** Fires when the sound has been seeked. */
        onseek?: Callback;

        /** Fires when the current sound finishes fading in/out. */
        onfade?: Callback;
    }

    class Howl {
        constructor(options: Options)

        /**
         * Begins playback of a sound. 
         * Only method that can't be chained.
         * 
         * @returns {SoundId} Sound id to be used with other methods
         * 
         * @memberof Howl
         */
        play(): SoundId

        /**
         * Begins playback of a sound. 
         * Only method that can't be chained.
         * 
         * If an ID of a sound that has been drained from the pool is passed, 
         * nothing will play.
         * 
         * @param {SoundId} id id of a sound to play
         * @returns {SoundId} Sound id to be used with other methods
         * 
         * @memberof Howl
         */
        play(id: SoundId): SoundId

        /**
         * Begins playback of a sprite.
         * Only method that can't be chained.
         * 
         * @param {SpriteId} sprite id of a sprite to play
         * @returns {SoundId} Sound id to be used with other methods
         * 
         * @memberof Howl
         */
        play(sprite: SpriteId): SoundId

        /**
         * Pauses playback of sound or group, saving the seek of playback.
         * 
         * @param {SoundId} [id] The sound ID. If none is passed, 
         *                       all sounds in group are paused.
         * @returns {Howl} Self for chaining
         * 
         * @memberof Howl
         */
        pause(id?: SoundId): Howl

        /**
         * Stops playback of sound, resetting seek to 0.
         * 
         * @param {SoundId} [id] The sound ID. If none is passed, 
         *                       all sounds in group are stopped.
         * @returns {Howl} Self for chaining
         * 
         * @memberof Howl
         */
        stop(id?: SoundId): Howl

        /**
         * Mutes the sound, but doesn't pause the playback.
         * 
         * @param {boolean} [muted] True to mute and false to unmute.
         * @param {SoundId} [id] The sound ID. If none is passed, 
         *                       all sounds in group are stopped.
         * @returns {Howl} Self for chaining
         * 
         * @memberof Howl
         */
        mute(muted?: boolean, id?: SoundId): Howl

        /**
         * Get volume of this sound or the group.
         * 
         * @param {SoundId} [id] The sound ID. ???
         * @returns {number} Volume from 0.0 to 1.0
         * 
         * @memberof Howl
         */
        volume(id?: SoundId): number

        /**
         * Set volume of this sound or the group.
         * 
         * @param {number} [volume] Volume from 0.0 to 1.0
         * @param {SoundId} [id] The sound ID. If none is passed, 
         *                       all sounds in group have volume altered 
         *                       relative to their own volume.
         * @returns {Howl} Self for chaining 
         * 
         * @memberof Howl
         */
        volume(volume: number, id?: SoundId): Howl

        /**
         * Fade a currently playing sound between two volumes. 
         * Fires the fade event when complete.
         * 
         * @param {number} from Volume to fade from (0.0 to 1.0)
         * @param {number} to Volume to fade to (0.0 to 1.0)
         * @param {number} duration Time in milliseconds to fade
         * @param {SoundId} [id] The sound ID. If none is passed, 
         *                       all sounds in group will fade.
         * @returns {Howl} Self for chaining 
         * 
         * @memberof Howl
         */
        fade(from: number, to: number, duration: number, id?: SoundId): Howl

        /**
         * Get the rate of playback for a sound.
         * 
         * @param {SoundId} [id] The sound ID. ???
         * @returns {number} The rate of playback. 0.5 to 4.0, 
         *                   with 1.0 being normal speed.
         * 
         * @memberof Howl
         */
        rate(id?: SoundId): number

        /**
         * Set the rate of playback for a sound.
         * 
         * @param {number} rate The rate of playback. 0.5 to 4.0, 
         *                      with 1.0 being normal speed.
         * @param {SoundId} [id] The sound ID. If none is passed, playback 
         *                       rate of all sounds in group will change.
         * @returns {Howl} Self for chaining 
         * 
         * @memberof Howl
         */
        rate(rate: number, id?: SoundId): Howl

        /**
         * Get the position of playback for a sound.
         * 
         * @param {SoundId} [id] The sound ID. ???
         * @returns {number} Current playback position
         * 
         * @memberof Howl
         */
        seek(id?: SoundId): number

        /**
         * Set the position of playback for a sound.
         * 
         * @param {number} seek The position to move current playback to 
         *                      (in seconds)
         * @param {SoundId} [id] The sound ID. If none is passed, 
         *                       the first sound will seek.
         * @returns {Howl} Self for chaining 
         * 
         * @memberof Howl
         */
        seek(seek: number, id?: SoundId): Howl

        /**
         * Get whether to loop the sound or group.
         * 
         * @param {SoundId} [id] The sound ID. ???
         * @returns {boolean} Whether the sound will loop
         * 
         * @memberof Howl
         */
        loop(id?: SoundId): boolean

        /**
         * Set whether to loop the sound or group.
         * 
         * @param {boolean} loop To loop or not to loop, that is the question.
         * @param {SoundId} [id] The sound ID. If none is passed, 
         *                       all sounds in group will have their 
         *                       loop property updated.
         * @returns {Howl} Self for chaining 
         * 
         * @memberof Howl
         */
        loop(loop: boolean, id?: SoundId): Howl

        /**
         * Check the load status of the Howl.
         * 
         * @returns {State} State of the Howl
         * 
         * @memberof Howl
         */
        state(): StateName

        /**
         * Check if a sound is currently playing or not. 
         * 
         * @param {SoundId} [id] Sound ID to check. If no sound ID is 
         *                       passed, check if any sound in the Howl 
         *                       group is playing.
         * @returns {boolean} Whether the sound is playing.
         * 
         * @memberof Howl
         */
        playing(id?: SoundId): boolean

        /**
         * Get the duration of the audio source. Will return 0 until 
         * after the load event fires.
         * 
         * @param {SoundId} [id] The sound ID to check. Passing an ID will 
         *                       return the duration of the sprite being 
         *                       played on this instance; otherwise, 
         *                       the full source duration is returned.
         * @returns {number} Duration of the audio source.
         * 
         * @memberof Howl
         */
        duration(id?: SoundId): number

        /**
         * Listen for events. Multiple events can be added 
         * by calling this multiple times.
         * 
         * @param {Event} event Name of event to fire/set.
         * @param {Callback} listener Define function to fire on event.
         * @param {SoundId} [id] Only listen to events for this sound id.
         * 
         * @memberof Howl
         */
        on(event: EventName, listener: Callback, id?: SoundId)
        on(event: 'loaderror', listener: Errback, id?: SoundId)

        /**
         * Same as on, but it removes itself after the callback is fired.
         * 
         * @param {Event} event Name of event to fire/set.
         * @param {Callback} listener Define function to fire on event.
         * @param {SoundId} [id] Only listen to events for this sound id.
         * 
         * @memberof Howl
         */
        once(event: EventName, listener: Callback, id?: SoundId)
        once(event: 'loaderror', listener: Errback, id?: SoundId)

        /**
         * Remove event listener that you've set. 
         * Call without parameters to remove all events.
         * 
         * @param {Event} [event] Name of event
         * @param {Callback} [listener] The listener to remove. Omit this 
         *                              to remove all events of type.
         * @param {SoundId} [id] Only remove events for this sound id.
         * 
         * @memberof Howl
         */
        off(event?: EventName, listener?: Callback, id?: SoundId)
        off(event: 'loaderror', listener: Errback, id?: SoundId)

        /**
         * This is called by default, but if you set preload to false, 
         * you must call load before you can play any sounds.
         * 
         * @memberof Howl
         */
        load()

        /**
         * Unload and destroy a Howl object. This will immediately stop 
         * all sounds attached to this sound and remove it from the cache.
         * 
         * @memberof Howl
         */
        unload()
    }

    interface HowlerGlobal {
        /**
         * true if the Web Audio API is available.
         * 
         * @type {boolean}
         * @memberof HowlerGlobal
         */
        readonly usingWebAudio: boolean;

        /**
         * true if no audio is available.
         * 
         * @type {boolean}
         * @memberof HowlerGlobal
         */
        readonly noAudio: boolean;

        /**
         * Automatically attempts to enable audio on mobile 
         * (iOS, Android, etc) devices.
         * 
         * @type {boolean}
         * @memberof HowlerGlobal
         */
        mobileAutoEnable: boolean;

        /**
         * Automatically suspends the Web Audio AudioContext after 
         * 30 seconds of inactivity to decrease processing and energy usage. 
         * Automatically resumes upon new playback. Set this property 
         * to false to disable this behavior.
         * 
         * @type {boolean}
         * @memberof HowlerGlobal
         */
        autoSuspend: boolean;

        /**
         * Exposes the AudioContext with Web Audio API.
         * Web Audio Only.
         * 
         * @type {boolean}
         * @memberof HowlerGlobal
         */
        readonly ctx: AudioContext;

        /**
         * Exposes the master GainNode with Web Audio API. This can be 
         * useful for writing plugins or advanced usage.
         * 
         * @type {GainNode}
         * @memberof HowlerGlobal
         */
        readonly masterGain: GainNode;

        /**
         * Mute or unmute all sounds.
         * 
         * @param {boolean} muted True to mute and false to unmute.
         * 
         * @memberof HowlerGlobal
         */
        mute(muted: boolean)

        /**
         * Get the global volume for all sounds, relative to their own volume.
         * 
         * @returns {number} Volume from 0.0 to 1.0.
         * 
         * @memberof HowlerGlobal
         */
        volume(): number

        /**
         * Set the global volume for all sounds, relative to their own volume.
         * 
         * @param {number} volume Volume from 0.0 to 1.0.
         * 
         * @memberof HowlerGlobal
         */
        volume(volume: number)

        /**
         * Check supported audio codecs. Returns true if the codec is 
         * supported in the current browser.
         * 
         * @param {string} ext File extension.
         * @returns {boolean} 
         * 
         * @memberof HowlerGlobal
         */
        codecs(ext: string): boolean

        /**
         * Unload and destroy all currently loaded Howl objects. 
         * This will immediately stop all sounds and remove them from cache.
         * 
         * @memberof HowlerGlobal
         */
        unload()
    }

    const Howler: HowlerGlobal;
}
