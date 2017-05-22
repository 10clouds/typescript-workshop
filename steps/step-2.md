# Krok 2: Proste typy

Mając już skonfigurowaną kompilację TypeScriptu możemy przejść do uzupełniania aplikacji o typy. Deklaruje się je po dwukropku następującym po nazwie deklaracji zmiennej lub argumentu. Kilka przykładów:

```ts
const token: string = ...
function add(x: number, y: number): string { ... }
//                                  ^ deklaracja zwracanego typu
```

## Kolekcje

Kolekcje deklarowane są w poprzez dodanie `[]` na końcu typu. Kolekcja wartości true/false to `boolean[]`.

Istnieje możliwość deklaracji kolekcji z wykorzystaniem generyków w następujący sposób: `Array<typ>`. Składnia z `[]` jest jednak preferowana. Generyki natomiast będą opisywane w dalszej części warsztatu.

## Type inference

Typy są opcjonalne, jeżeli ich nie podamy, TypeScript będzie próbować domyślić się typu na podstawie wartości. Kilka przykładów:
```ts
let argsStr = 'abc|def|ghj';
//              ^ używając literału TypeScript wie jaki to typ
argsStr = 10
//        ^ Error: Type 'number' is not assignable to type 'string'
const args = argsStr.split('|');
//                  ^ wiedząc że argsStr to string i posiadając wbudowane informacje o metodach, args otrzyma typ string[]
```

Jeżeli TypeScript nie jest w stanie się domyślić typu zostaje w domyśle użyty `any`, który może być dowolnym typem. W tym przypadku zdani jesteśmy na siebie i TypeScript nie jest w stanie nam pomóc, gdy na przykład próbujemy użyć nieistniejącej metody.

## Type assertion (casting)

Możemy nadpisać typ przez słowo kluczowe `as`. Ten zabieg powinien być stosowany tylko w ostateczności. Jeden z niewielu przypadków, gdzie może okazać się przydatny to łączenie (chain) funkcji, które jest skomplikowane do zadeklarowania w TypeScript.
```ts
const foo = [...].filter(...).reduce(...) as Foo;
```
Można również spotkać starszą składnię `<HTMLElement>findElement()`, jednak nie jest ona zalecana, głównie ze względu niekompatybilność z plikami JSX.

## Do zrobienia:

- dodaj typy dla argumentów i zwracanych wartości w `src/utils/urls.js`

## Dodatkowe materiały

- Dodatkowe informacje o działaniu `type inference`: https://www.typescriptlang.org/docs/handbook/type-inference.html
