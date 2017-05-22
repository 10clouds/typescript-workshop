# Krok 3: Interfejsy

Do przekazywania danych w JavaScripcie bardzo często wykorzystywane są obiekty anonimowe. Interfejsy mają za zadanie takie obiekty opisać i dać nam wgląd, jakie posiadają właściwości. Zobacz na przykładową deklarację interfejsu:

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

## Interfejsy c.d.

Interfejsy mogą opisywać funkcje, tablice i implementację klas.
```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}
interface StringArray {
    [index: number]: string;
}
interface Clock {
    currentTime: Date;
    setTime(d: Date);
}
```

## Deklaracja w miejscu wykorzystania

Interfejsy nie muszą być deklarowane ze słowem kluczowym. Jeżeli nie ma potrzeby reużywania interfejsu można zadeklarować go w miejscu wykorzystania.

```ts
function printLabel(labelledObj: { label: string }) { ... }
```

## Do zrobienia
- opisz typ zwracanych danych korzystając z interfejsów w `spotify/api.js`
    - tip: aby opisać, że funkcja zwraca `Promise` użyj `Promise<...>`, gdzie `...` to nazwa twojego interfejsu
