declare module 'howler' {
    export namespace Howl {
        export type Format = 'mp3' | 'ogg';
        export type State = 'unloaded' | 'loading' | 'loaded';

        export interface Options {
            src: string[];
            autoplay?: boolean;
            preload?: boolean;
            format?: Format[];
        }
    }

    export class Howl {
        constructor(options: Howl.Options);

        state(): Howl.State;
        load(): void;
        play(): void;
        playing(): boolean;
        stop(): void;
    }

    export interface HowlerGlobal {
        volume(number): void;
    }

    export const Howler: HowlerGlobal;
}
