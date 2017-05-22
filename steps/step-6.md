# Krok 7: Zaawansowane typy

Najczęściej używane deklaracje typów już mamy za sobą, czasem jednak
nie wystarczą one do precyzyjnego opisania pewnych funkcji co
pozwalałoby prześlizgnąć się niektórym błędom. 

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

Przecięć używa się przede wszystkim podczas pracy z mixin'ami, klasami,
które same nie mają prawa bytu, ale mogą wzbogacać inne klasy.

```ts
class HideableMixin {
    isVisible = true;
    show() { this.isVisible = true; }
    hide() { this.isVisible = false; }
}

class Sidebar { 
    items: string[];
}

const HideableSidebar = mix(Sidebar, HideableMixin);
const sidebar = new HideableSidebar();
sidebar.items = ['one', 'two', 'three'];
sidebar.hide();
```

Aby to osiągnąć funkcja `mix` mogłaby wyglądać na przykłąd tak:

```ts
interface Constructor<T> {
    new (): T
}

function mix<B, M>(
    base: Constructor<B>, 
    mixin: Constructor<M>,
): Constructor<B & M> {
    function Mixed() {
        base.call(this);
        mixin.call(this);
    }
    
    Mixed.prototype = Object.assign(
        Object.create(base.prototype),
        mixin.prototype,
    );

    return (Mixed as any) as Constructor<B & M>;
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

Zmień interface opisujący wyszukiwanie w spotify tak, aby możliwe było
jedynie przeszukiwanie akceptowalnych typów danych: albumów, utworów
i artystów.

## Type guard

Czasem kiedy używamy unii lub dziedziczenia zdaża się, że potrzebujemy
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

Dodaj type guards dla różnych typów danych zwracanych przez spotify, tak
aby można było sprawdzić czy dany obiekt jest artystą, albumem czy artystą.
