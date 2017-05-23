# Krok 5: Typy generyczne

Sposoby definiowania typów, które do tej pory przedstawiliśmy nie radzą sobie dobrze z uogólnianiem funkcjonalności niezależnie od typu danych. Weźmy jako przykład `Promise`. Przypuśćmy, że jego definicja wyglądałaby tak:

```ts
declare class Promise {
    constructor(executor: (
        resolve: (date: any) => void, 
        reject: (err: any) => void,
    ) => void);

    then(
        onFulfilled: (data: any) => any,
        onRejected?: (err: any) => any,
    ): Promise

    catch(onRejected: (err: any) => any): Promise
}
```

Za każdym razem kiedy zwracalibyśmy coś asynchronicznie przez `Promise` tracilibyśmy informacje o typie danych, który on przechowuje.

```ts
class Foo {}

function getFoo() {
    return new Promise((resolve) => resolve(new Foo()));
}

const foo = await getFoo();  // foo ma typ any
```

Oczywiście możnaby to próbować obejść, przez tworzenie specjalizowanych dzieci `Promise` dla konkretnych typów danych lub rzutować `any` na konkretny typ przy każdym użyciu, jednak jest to niepraktyczne.

Rozwiązaniem tego problemu są typy generyczne, parametryzowane innymi typami.
Definicja typu generycznego różni się dodatkowymi nawiasami ostrymi występującymi po nazwie typu. Możemy poprosić o przekazanie wielu argumentów, jak w przypadku `React.Component`. Następnie przekazane typy można wykorzystywać w definicji typu.

```ts
declare class Promise<T> {
    constructor(executor: (
        resolve: (data: T) => void, 
        reject: (err: any) => void,
    ) => void);

    then(
        onFulfilled: (data: T) => T | Promise<T>,
        onRejected?: (err: any) => any,
    ): Promise<T>

    catch(onRejected: (err: any) => any): Promise<T>
}
```

Dzięki temu, nie potrzebujemy tworzyć nadmiernych klas i nie tracimy informacji o typach.

```ts
class Foo {}

function getFoo() {
    return new Promise<Foo>((resolve) => resolve(new Foo()));
}

const foo = await getFoo();  // foo ma typ Foo
```

Funkcje także mogą być generyczne.

```ts
function self<T>(obj: T) {
    return obj;
}

const one = self<number>(1);
const two = self<string>('two');
```

Jeśli TypeScript potrafi na podstawie argumentów funkcji wywnioskować typy, które musiałyby być przekazane do generyka, możemy pominąć ręczne przekazywanie parametrów.

```ts
const one = self(1);
const two = self('two');
```

W definicji typu/funkcji generycznej możemy też zawęzić akceptowalne typy, a także podać domyślne.

```ts
function elementsOnly<T extends HTMLElement>() {}
function withDefault<T = HTMLDivElement>() {}
function elementsOnlyWithDefault<T extends HTMLElement = HTMLDivElement>() {}

elementsOnly<HTMLParagraphElement>()
elementsOnly<number>();  // ERROR
withDefault();
withDefault<HTMLParagraphElement>()
withDefault<number>();
elementsOnlyWithDefault();
elementsOnlyWithDefault<HTMLParagraphElement>();
elementsOnlyWithDefault<number>();  // ERROR
```

Czasem warto zadeklarować alias na jakiś typ (nie tylko generyczny), można wtedy posłużyć się słowem `type`.

```ts
type NumberPromise = Promise<number>;
```

Poza `Promise<T>` i `React.Component<P, S>` korzystaliśmy już z innego generyka `Array<T>`, znanego także jako `T[]`.

## Zadanie

Stwórz generyczny interfejs dla obiektu stronnicowania będącego częścią odpowiedzi z API spotify w `src/trackSearch`.
