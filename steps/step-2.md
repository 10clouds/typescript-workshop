# Krok 2: Proste typy

Mając już skonfigurowaną kompilację TypeScriptu możemy przejść do uzupełniania aplikacji o typy. Nie jest to wymagane, ale pozwoli na bardziej wnikliwą analizę kodu przez TypeScript. 

Typ dla danej zmiennej deklaruje się po drukropku. Dla zobrazowania kilka przykładów:

```ts
const token: string = ...
function add(x: number, y: number): string { ... }
//                                  ^ deklaracja zwracanego typu
class Pet {
  name: string;
  born: Date;
}
```

Oto podstawowe typy, które możesz wykorzystać w TypeScript:

```ts
const a: boolean = true
const b: number = 1
const c: string = 'foo';
const d: null = null;
const e: undefined = undefined;
const f: symbol = Symbol();
const g: object = {foo: 1};
```

## Tablice

Tablice deklarowane są w poprzez dodanie `[]` na końcu typu, np. `number[]` to kolekcja liczb.

`typ[]` jest równoważny `Array<typ>` z wykorzystaniem generyków. Składnia z `[]` jest jednak preferowana, a o generykach więcej dowiesz się w jednym z następnych rozdziałów.

## Type inference

Typy są opcjonalne. Jeżeli ich nie podamy, TypeScript będzie próbował domyślić się typu na podstawie wartości. Kilka przykładów:
```ts
let argsStr = 'abc|def|ghj';
//              ^ używając literału TypeScript wie jaki to typ
argsStr = 10
//        ^ Error: Type 'number' is not assignable to type 'string'
const args = argsStr.split('|');
//                  ^ wiedząc że argsStr to string i posiadając wbudowane informacje o metodach, args otrzyma typ string[]
```

Jeżeli TypeScript nie jest w stanie domyślić się typu, w domyśle użyty zostanie `any`. Oznacza to, że w tym przypadku zdani jesteśmy na siebie i TypeScript nie będzie podejmował prób sprawdzania kodu opierającego się na tych zmiennych, np. gdy będziemy próbować użyć nieistniejącej metody.

To zachowanie można zmienić używając flagi `"noImplicitAny": true` w opcjach kompilatora w `tsconfig.json`. Wtedy TypeScript będzie informował nas w każdym przypadku, gdy oczekuje podania typu.

## Type assertion (casting)

Możemy nadpisać typ używając słowa kluczowego `as`. Ten zabieg powinien być stosowany tylko w ostateczności. Jeden z niewielu przypadków, gdzie może okazać się przydatny to łączenie (chain) funkcji, które jest skomplikowane do zadeklarowania w TypeScript.

```ts
const foo = [...].filter(...).reduce(...) as Foo;
```
Można również spotkać starszą składnię `<HTMLElement>findElement()`, jednak nie jest ona zalecana, głównie ze względu niekompatybilność z plikami JSX.

## Do zrobienia:

- dodaj typy dla argumentów i zwracanych wartości w `src/utils/urls.js`

## Dodatkowe materiały

- Dodatkowe informacje o działaniu `type inference`: https://www.typescriptlang.org/docs/handbook/type-inference.html

## [Krok 3: Interfejsy ➜](./step-3.md)
