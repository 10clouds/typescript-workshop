# Krok 3: Interfejsy

Do przekazywania danych w JavaScripcie bardzo często wykorzystywane są obiekty anonimowe. Interfejsy mają za zadanie takie obiekty opisać i pozwolić na sprawdzanie poprawnego ich wykorzystania podczas transpilacji. Zobacz na przykładową deklarację interfejsu:

```ts
interface Square {
    color?: string;
//       ^ pytajnik oznacza opcjonalną właściwość, która może przyjąć undefined
    width: number;
    readonly type: string;
//  ^ właściwość dostępna tylko do odczytu, deklarowana podczas tworzenia obiektu, podobnie jak const
}
```

## Wykorzystywanie interfejsów

Interfejsy to typy i wykorzystuje się je podobnie jak podstawowe typy poznane wcześniej. Różnica polega na konieczności importu interfejsu, jeżeli nie został zadeklarowany w tym samym pliku.
```ts
import { Square } from '...';

function makeSquare(type: string): Square { ... }
const squares: Square[] = [...];
```

## Opisywanie funkcji, tablicy oraz klas

Interfejsy mogą opisywać także funkcje, tablice i implementację klas.
```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}
interface StringArray {
    [index: number]: string;
//   ^ nazwa własna indeksu
}
interface Clock {
    currentTime: Date;
    setTime(d: Date);
}
```

## Rozszerzanie

Interfejsy mogą dziedziczyć po sobie. Mechanizm działa tak samo, jak w przypadku klas - definicje pól zostaną przepisane do nowego interfejsu.
```ts
interface BaseObject {
    id: string;
}
interface Author extends BaseObject {
    name: string;
}
```

## Deklaracja inline

Interfejsy nie muszą być deklarowane ze słowem kluczowym. Jeżeli nie ma potrzeby reużywania interfejsu można zadeklarować go w miejscu wykorzystania.

```ts
function printLabel(labelledObj: { label: string }) { ... }
```

## Do zrobienia
- opisz typ zwracanych danych korzystając z interfejsów w metodzie `search()` pliku `search/trackSearch.js`

## Tips
Aby opisać `Promise` użyj `Promise<...>`, gdzie `...` to nazwa twojego interfejsu. `Promise` to interfejs generyczny, więcej o nich w późniejszych rozdziałach.
Spotify posiada bardzo dobrą dokumentację, może być pomocna przy budowie interfejsu: https://developer.spotify.com/web-api/search-item/
