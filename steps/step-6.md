# Krok 6: Zaawansowane typy

Najczęściej używane deklaracje typów już mamy za sobą, czasem jednak
nie wystarczą one do precyzyjnego opisania pewnych funkcji co
pozwalałoby prześlizgnąć się niektórym błędom. 

## Enum

Enumy pozwalają na zdefiniowanie zestawów stałych numerycznych, co jest przydatne jeśli chcemy zapewnić, że wartość będzie jedną z kilku akceptowalnych.

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```

Domyślnie wartości są nadawane kolejno od 0, czyli w powyższym:

```ts
Direction.Up    === 0
Direction.Down  === 1
Direction.Left  === 2
Direction.Right === 3
```

Możemy jednak zmienić w dowolnym miejscu sekwencję lub przypisać wartość typu string, np.:

```ts
enum Direction {
    Up = 1,          // 1
    Down,            // 2
    Left = 11,       // 11
    Right = 'RIGHT', // RIGHT
}
```

Można też wykorzystać enumy do zdefiniowania listy opcji, które potem można łączyć operatorami bitowymi.

```ts
enum FileAccess {
    None = 0,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
}
```

W przeciwieństwie do interface'ów enumy są fizycznymi obiektami, które można wykorzystać w czasie działania aplikacji, np. żeby odzyskać nazwę opcji na podstawie wartości.

```ts
FileAccess[FileAccess.Read] === 'Read'
FileAccess[FileAccess.Read | FileAccess.Write] === 'ReadWrite'
```

### Zadanie

Dodaj enum `Direction`, aby doprecyzować parametr `direction` w `TrackSearch` (`src/search/trackSearch.ts`)

## Łączenie typów

TypeScript pozwala na zdefiniowanie typu, który reprezentuje połączenie
kilku innych. Służą do tego operatory `|`, tworzący unię, i `&`, tworzący
przecięcie typów.

### Przecięcie `A & B`

Przecięcie tworzy typ, który posiada charakterystyki wszystkich
wymienionych typów.

```ts
interface Person {
    name: string;
    age: number;
}

interface Tagged {
    tags: string[];
}

type TaggedPerson = Person & Tagged;
```

W efekcie otrzymalibyśmy typ `TaggedPerson` odpowiadający:

```ts
interface TaggedPerson {
    name: string;
    age: number;
    tags: string[];
}
```

### Unia `A | B`

Unia tworzy typ, do którego można przypisać dowolny z wymienionych.

```ts
type NumberOrString = number | string;
const items: NumberOrString[] = [1, 'two'];
```

Unie są przydatne kiedy funkcje mogą przyjmować argumenty różnych typów, 
szczególnie kiedy typ wartości zwracanej się nie zmienia, np. konstruktor `Date`.

```ts
interface Date {
    constructor(value: number | string)
}

new Date(1495308000000);
new Date('2017-05-20T21:20:00+0200')
```

Unie są też automatycznie tworzone przez TypeScript, np. dla opcjonalnych
argumentów funkcji. Poniższe dwie deklaracje są równoważne.

```ts
function foo(bar?: string) {}
function foo(bar: string | undefined) {}
```

## Literały jako typy

TypeScript od wersji 1.8 wspiera definiowanie typów używając literałów.

```ts
type One = 1;
type Two = 2;
let one: One = 1;
let two: Two = 2;
one = two;  // Error: Type '2' is not assignable to type '1'.
```

Literały w połączeniu z unią są bardzo pomocne w przypadku skończonej
liczby akceptowalnych wartości.

```ts
function setPosition(
    element: HTMLElement, 
    position: 'static' | 'relative' | 'absolute' | 'fixed',
) {
    element.style.position = position;
}
```

Alternatywnie można też wykorzystać przeładowanie funkcji, jeśli różne
wartości całkowicie zmieniają jej działanie tak jak w przypadku
`addEventListener`.

```ts
function addEventListener(
    type: 'click', 
    listener: (event: MouseEvent) => void,
)
function addEventListener(
    type: 'keydown',
    listener: (event: KeyboardEvent) => void,
)
```

### Zadanie

Dodaj możliwość wyszukiwania dodatkowych typów obiektów w metodzie `search()` klasy `trackSearch`:
- dodaj opcjonalny parametr `type` pozwalający na wybranie wyszukiwanego obiektu, gdzie jego
    - typ to unia literałów `track`, `artist`, `album`
    - domyślna wartość to `track`
- zmień nazwę klasy na `SpotifySearch` korzystając z opcji `Rename Symbol` w VSCode

## Type guard

Czasem kiedy używamy unii lub dziedziczenia zdarza się, że potrzebujemy
wykonać pewną logikę tylko dla konkretnego typu, ale sprawdzenie czy
dana zmienna jest tego typu jest bardziej skomplikowane niż użycie operatora
`typeof` czy `instanceof`. W tych przypadkach przydają się strażnicy typów (?), 
ang. type guards.

Type guard jest to funkcja, która przyjmuje pewną wartość i sprawdza czy
jest ona odpowiedniego typu.

```ts
function isFoo(obj: any): obj is Foo {
    return obj.type === 'foo';
}
```

Jeśli użyjemy strażnika w `if` do sprawdzenia typu zmiennej, wewnątrz bloku
będzie ona miała typ gwarantowany przez strażnika i będziemy mogli skorzystać 
z jego pól i metod.

```ts
interface Message {
    id: number;
    date: Date;
    type: string;
    user: string;
}

interface TextMessage extends Message {
    type: 'text';
    text: string;
}

function isTextMessage(message: Message): message is TextMessage {
    return message.type === 'text';
}

interface FileMessage extends Message {
    type: 'file';
    name: string;
}

function isFileMessage(message: Message): message is FileMessage {
    return message.type === 'file';
}

function logMessage(message: Message) {
    if (isTextMessage(message)) {
        console.log(`[${message.date}] ${message.user}: ${message.text}`);
    } else if (isFileMessage(message)) {
        console.log(`[${message.date}] ${message.user} shared ${message.name}`);
    } else {
        throw new Error(`Unknown message type: ${message.type}`);
    }
}
```

### Zadanie

Dodaj type guards dla interfejsu `Track`, tak aby można było sprawdzić czy dany
obiekt jest utworem w przypadku, gdy tablica posiada obiekty typu `SpotifyObject`.

## [Krok 7: Definicje typów dla bibliotek ➜](./step-7.md)
