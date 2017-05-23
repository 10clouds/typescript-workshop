# Krok 3: Interfejsy

Do przekazywania danych w JavaScripcie bardzo często wykorzystywane są obiekty anonimowe. Interfejsy mają za zadanie takie obiekty opisać i pozwolić na sprawdzanie poprawnego ich wykorzystania. Spójrz na przykładową deklarację interfejsu:

```ts
interface Square {
    width: number;
    color?: string;
//        ^ pytajnik oznacza opcjonalną właściwość, która może przyjąć undefined
    readonly type: string;
//  ^ właściwość dostępna tylko do odczytu, deklarowana podczas tworzenia obiektu, podobnie jak const
}

const square: Square = {
    width: 100,
    type: 'custom',
};
```

## Metody

```ts
interface Clock {
    currentTime: Date;
    setTime(d: Date): void;
}
const clock: Clock = {
   currentTime: new Date,
   setTime: function (date) {
       this.currentTime = date;
   },
}
```

## Funkcje
```ts
interface ScaleImgAsync {
    (base64input: string, callback: (string) => void): void;
//                                  ^ deklaracja inline interfejsu funkcji
}
const search: ScaleImgAsync = function (input: string, callback: (string) => void): void {
    callback(scaledBase64);
}
```

## Słowniki
```ts
interface MonthMap {
    [month: string]: Date;
//   ^ nazwa własna indeksu wykorzystywana w podpowiedziach IDE
}

const monthMap = {
   January: new Date(2017, 0, 1),
   February: new Date(2017, 1, 1),
}
```

## Wykorzystywanie interfejsów

Interfejsy to typy i wykorzystuje się je podobnie jak podstawowe typy poznane wcześniej. Różnica polega na konieczności importu interfejsu, jeżeli nie został zadeklarowany w tym samym pliku.
```ts
import { Square } from '...';

function makeSquare(type: string): Square { ... }
const squares: Square[] = [...];
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

## Anonimowe interfejsy

Interfejsy nie muszą być deklarowane ze słowem kluczowym. Jeżeli nie ma potrzeby reużywania interfejsu można zadeklarować go w miejscu wykorzystania.

```ts
function printLabel(labelledObj: { label: string }) { ... }
```

## Do zrobienia
- opisz typ zwracanych danych korzystając z interfejsów w metodzie `search()` pliku `search/trackSearch.js`. Poniżej znajdziesz diagram z przykładową strukturą interfejsów:

![Diagram](https://raw.githubusercontent.com/10clouds/typescript-workshop/master/steps/assets/api-interface-diagram.png)

## Tips
- Aby opisać `Promise` użyj `Promise<...>`, gdzie `...` to nazwa twojego interfejsu. `Promise` to interfejs generyczny, więcej o nich w późniejszych rozdziałach.
- Spotify posiada bardzo dobrą dokumentację, może być pomocna przy budowie interfejsu: https://developer.spotify.com/web-api/search-item/
