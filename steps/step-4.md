# Krok 4: Klasy

Komponenty w Reactcie najczęściej definiowane są przy wykorzystaniu klas ze standardu ES2015. Skupimy się głównie na dodatkowej składni TypeScriptu. Podstawowe funkcjonalności są zgodne z ES2015.

```ts
export class Clock {
    currentTime: number;

    constructor(hoursCount: number) { ... }

    get timestamp(): string { ... }

    start(): string { ... }
}
```

## Różnice względem ES2015

- `public`, `private`, `protected`, definiują kto ma dostęp do danego pola:
    - `public` - wszyscy, domyślny poziom dostępu
    - `protected` - tylko dana klasa i klasy po niej dziedziczące
    - `private` - tylko dana klasa

    ```ts
    class Base {
        public publicProp: any;  // lub po prostu publicProp: any
        protected protectedProp: any;
        private privateProp: any;

        constructor() {
            // Base ma dostep do wszystkiego
            this.publicProp;
            this.protectedProp;
            this.privateProp;
        }
    }

    class SubClass extends Base {
        constructor() {
            super();

            // SubClass ma dostęp do pól public i protected
            this.publicProp;
            this.protectedProp;

            // ...ale nie do private
            this.privateProp;  // ERROR 
        }
    }

    // użytkownicy Base/SubClass mają dostęp tylko do public
    const base = new Base();
    base.publicProp;
    base.protectedProp;  // ERROR
    base.privateProp;    // ERROR

    const sub = new SubClass();
    sub.publicProp;
    sub.protectedProp;   // ERROR
    sub.privateProp;     // ERROR
    ```

- `readonly`, odpowiednik `const` dla pól klas, pola `readonly` mogą być ustawiane tylko wewnątrz konstruktora
    
    ```ts
    class Api {
        readonly url: string;

        constructor() {
            this.url = '/api';
        }

        configure(url: string) {
            this.url = url;  // ERROR
        }

        async get(path) {
            const response = await fetch(`${this.url}/${path}`);
            return await response.json();
        }
    }

    const api = new Api();
    api.url = '/api/3'  // ERROR
    ```

- definiowanie pól przez argumenty konstruktora, gdy przed nazwą argumentu pojawi się modyfikator dostępu

    ```ts
    class Foo {
        constructor(public bar: number) {}
    }
    ```

    jest równoważne

    ```ts
    class Foo {
        public bar: number;
        constructor(bar: number) { this.bar = bar; }
    }
    ```

- `implements` pozwala na wskazanie, które interfejsy powinna implementować dana klasa

    ```ts
    interface Serializable {
        toJSON(): any
    }

    class Foo implements Serializable {
        id: number;

        toJSON() {
            return {type: 'foo', id: this.id};
        }
    }

    // ERROR: Bar nie implementuje toJSON
    class Bar implements Serializable {}
    ```

- `abstract` do tworzenia klas abstrakcyjnych. Zawierają one tylko częściową implementację, która musi byc uzupełniona przez klasę dziedziczącą. Nie można tworzyć instancji takich klas.

    ```ts
    abstract class Logger {
        debug(message: string) {
            this.write(`DEBUG: ${message}`);
        }

        abstract write(data: string): void
    }

    const logger = new Logger();  // ERROR: 
    class BadLogger extends Logger {}  // ERROR

    class ConsoleLogger extends Logger {
        write(data) { 
            console.log(data); 
        }
    }

    const logger = new ConsoleLogger();
    logger.debug('some message');
    ```

- dekoratory

## Komponenty jako klasa w React

`React.Component` jest klasą generyczną (opowiemy jak je definiować w następnym kroku), której musimy przekazać:
- typ pól (`this.props`)
- typ stanu (`this.state`)

Dzięki temu TypeScript może zweryfikować przekazywane właściwości i stan komponentu.

```ts
interface CounterProps {
    initial: number;
}

interface CounterState {
    value: number;
}

export class Counter extends React.Component<CounterProps, CounterState> {
    constructor(props) {
        super();
        this.state = {
            // ERROR: nie istnieje CounterProps.initialValue
            value: props.initialValue,
        };
    }

    increment() {
        this.setState((state) => ({value: state.value + 1}));
    }

    render() {
        return (
            <button onClick={this.increment.bind(this)}>
                // ERROR: nie istnieje CounterState.currentValue
                { this.state.currentValue }
            </button>
        );
    }
}
```

### Zadanie
- dodaj interfejsy dla właściwości i stanu dla komponentów:
    - `Search` (`src/search/Search.jsx`)
    - `Pagination` (`src/search/Pagination.jsx`)
- wykorzystaj właściwość `readonly` oraz modyfikatory dostępu w klasie `TrackSearch` (`src/search/trackSearch.ts`)

## [Krok 5: Generyczne typy ➜](./step-5.md)
