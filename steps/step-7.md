# Krok 7 - Definicje typów dla bibliotek

Aby efektywnie korzystać z TypeScript, musi on mieć dostęp do definicji
typów bibliotek z których korzystamy. Z punktu widzenia ich użytkownika
możemy podzielić je na kilka typów.

## Biblioteki z wbudowanymi definicjami

Jeśli zainstalowaliśmy bibliotekę z [`npm`][npm], może ona mieć wbudowaną 
definicję typów, wystarczy, że w jej `package.json` jest klucz `types`
(dawniej `typings`) ze ścieżką do pliku `.d.ts`, który ją opisuje.
Alternatywnie, jeśli plikiem wejściowym jest `index.js`, to wystarczy,
że obok będzie `index.d.ts`.

Dla użytkownika oznacza to tyle, że biblioteka jest gotowa do działania
bez żadnych dodatkowych akcji.

Przykłady:

- [`moment`][moment]
- [`rxjs`][rxjs]

## Biblioteki z definicjami utrzymywanymi przez społeczność

Często autorzy bibliotek napisanych w czystym JavaScripcie nie chcą
utrzymywać definicji dla TypeScript'a. Dla wielu z takich paczek
istnieją definicje tworzone i utrzymywane przez społeczność. Są one
publikowane w [`npm`][npm] pod organizacją [`types`][types]. 
Jeśli więc instalujemy jakąś nową paczkę, która nie ma wbudowanych 
definicji, warto spróbować zainstalować paczkę z przedrostkiem 
`@types/`, na przykład:

```sh
$ npm install --save react
$ npm install --save-dev @types/react
```

Organizacja `types` zawiera definicje dla ponad 3000 bibliotek, więc
jest spora szansa, że znajdziesz to czego potrzebujesz. 
Są one wersjonowane podobnie do paczek, które opisują, zmieniając 
jedynie znaczenie ostatniego segmentu wersji (patch), który wyznacza 
wersję definicji. Tak więc jeśli korzystamy z `react` w wersji `15.0.5`, 
instalujemy `@types/react` w wersji `15.0.x`. Jeśli API biblioteki
nie zmienia się ze zmianą drugiego segmentu (minor), definicje będą
miały zawsze `0` w tym segmencie, np. definicje dla NodeJS `6.10.3`
będą miały wersje `6.0.x`.

Przykłady:

- [`lodash`][lodash] - [`@types/lodash`][@types/lodash]
- [`react`][react] - [`@types/react`][@types/react]

## Biblioteki bez definicji

Od czasu do czasu znajdziemy jakąś niszową, ale przydatną dla nas paczkę,
która nie ma definicji. Od TypeScript'a 2.1 możemy importować takie
paczki, ale ich typem będzie `any`, co nie jest zbyt przydatne.
W takich przypadkach jesteśmy skazani na napisanie własnych definicji.

Na potrzeby warsztatu załóżmy, że [`@types/howler`][@types/howler] 
nie istnieje i stwórzmy prostą definicję opisującą fragmenty API
[`howler.js`][howler], z których korzystamy.

### Deklaracja modułu

Jeśli możemy dodać plik `*.d.ts` "obok" pliku `*.js`, wystarczy 
użyć `export`. Przypuśćmy, że mamy plik `add.js`:

```js
export function add(a, b) { return a + b; }
```

wystarczy obok dodać plik `add.d.ts`

```ts
export function add(a: number, b: number): number;
```

TypeScript automatycznie założy, że plik `.d.ts` o tej samej ścieżce
jest definicją dla pliku JavaScript.

Niestety w przypadku modułów z `npm`, które musimy opisać samemu, 
nie jesteśmy w stanie dodać czegoś "obok". Wtedy należy posłużyć się 
słowem kluczowym `declare`, który oznajmia światu, że coś istnieje
w globalnym kontekście.

```ts
declare const React: any;
```

Mając taką deklarację w każdym miejscu będziemy mieli dostęp do globalnej
stałej `React`.

Podobnie, zamiast globalnej stałej, możemy zadeklarować moduł.

```ts
declare module 'react';
```

Dzięki temu, w dowolnym module będziemy mogli zaimportować `react`.

#### Zadanie

Stwórz katalog `types` obok `src` i plik `types/howler.d.ts`, dodaj deklarację modułu `howler`.

### Interface modułu

Samo zadeklarowanie, że moduł istnieje nie wiele nam daje, powinniśmy
opisać co dostarcza dany moduł wykorzystując `export`.

```ts
declare module 'react' {
    export interface Element {}

    export abstract class Component<Props = {}, State = {}> {
        props: Props;
        state: State;

        constructor(props: Props);
        render(): Element;
    }

    export interface ComponentType<T extends Component> {
        new (props: T['props']): T
    }

    export function createElement<T extends Component>(
        type: ComponentType<T>,
        props: T['props'],
        children: Element[],
    ): Element;
}
```

#### Zadanie

Dodaj `Howler.volume()` do deklaracji modułu `howler`.

Dodaj klasę `Howl` do deklaracji modułu `howler` uwzględniając tylko
wykorzystywane części jej interface'u:

- `new Howl({src, autoplay, preload, format})`
- `Howl.state()`
- `Howl.load()`
- `Howl.play()`
- `Howl.playing()`
- `Howl.stop()`

### Dokumentacja

Dla TypeScript sam interface jest wystarczający, jednak dla programisty
warto też dodać dokumentację do dostarczanych elementów za pomocą
JSDoc. Będzie ona wyświetlana przy podpowiedziach w IDE. 

Najczęściej jest to kwestia prostego przeklejenia opisów z dokumentacji 
danej biblioteki, a znacznie upraszcza pracę w przyszłości.

```ts
declare module 'react' {
    /**
     * VirtualDOM element
     */
    export interface Element {}

    /**
     * Base class for all React components
     */
    export abstract class Component<Props = {}, State = {}> {
        /**
         * Contains the props that were defined by the caller 
         * of this component
         */
        props: Props;

        /**
         * Contains data specific to this component that may 
         * change over time
         */
        state: State;

        /**
         * Called before the component is mounted.
         * 
         * The constructor is the right place to initialize state. 
         * If you don't initialize state and you don't bind methods, 
         * you don't need to implement a constructor for your component.
         * 
         * @param {Props} props initial properties
         */
        constructor(props: Props);

        /**
         * Should examine this.props and this.state and return a single 
         * Element. 
         * 
         * This element can be either a representation of a native DOM 
         * component, such as <div />, or another composite component 
         * that you've defined yourself.
         * 
         * The render() function should be pure:
         * - it does not modify component state
         * - it returns the same result each time it's invoked
         * - it does not directly interact with the browser
         * 
         * @returns {Element} Element which should be rendered
         */
        render(): Element;
    }

    interface ComponentType<T extends Component> {
        new (props: T['props']): T
    }

    /**
     * Create and return a new React element of the given type. 
     * 
     * @param {ComponentType<T>} type React component type
     * @param {T['props']} props Properties to instantiate the component with
     * @param {Element[]} children child Elements
     * @returns {Element} created Element
     */
    export function createElement<T extends Component>(
        type: ComponentType<T>,
        props: T['props'],
        children: Element[],
    ): Element;
}
```

#### Zadanie

Dodaj JSDoc do elementów modułu `howler`.


Więcej informacji na temat pisania deklaracji możecie znaleźć 
w [dokumentacji TypeScript][.d.ts authoring guide]


[npm]: https://www.npmjs.com/
[types]: https://www.npmjs.com/~types
[rxjs]: https://www.npmjs.com/package/rxjs
[moment]: https://www.npmjs.com/package/moment
[react]: https://www.npmjs.com/package/react
[@types/react]: https://www.npmjs.com/package/@types/react
[lodash]: https://www.npmjs.com/package/lodash
[@types/lodash]: https://www.npmjs.com/package/@types/lodash
[howler]: https://www.npmjs.com/package/howler
[@types/howler]: https://www.npmjs.com/package/@types/howler
[glob patterns]: https://github.com/isaacs/node-glob#glob-primer
[.d.ts authoring guide]: https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
