# Krok 3: Klasy

Komponenty w Reactcie najczęściej definiowane są przy wykorzystaniu klas ze standardu ES2015. Skupimy się głównie na dodatkowej składni TypeScriptu, jest to nadzbiór JavaScriptu, tak więc podstawy są zgodne z ES2015.

```ts
export class Clock {
    private currentTime: number;

    constructor(private readonly hoursCount: number) { ... }

    get timestamp(): string { ... }

    private start(): string { ... }
}
```

## Różnice względem klas ES2015

- modyfikatory dostępu `public`, `private`, `protected`
    - domyślnie `public`
    - sprawdzane tylko podczas transpilacji, w kodzie wynikowym wszystko jest `public`
- właściwości `readonly`
- initializacja pola wartością argumentu konstruktora, gdy przed nazwą argumentu pojawi się modyfikator dostępu
```ts
constructor(private hoursCount: number) { ... }
//                           ^ hoursCount będzie dostępne jako this.hoursCount z odpowiednią wartością przy utworzeniu klasy bez dodatkowego kodu w konstruktorze
```
- możliwość implementowania interfejsów przez klasy
- klasy abstrakcyjne - zawierają część implementacji, ale nie pozwalają na utworzonie własnej instancji
- dekoratory (o nich więcej później)

## Komponenty jako klasa w React
```ts
interface HelloProps {
    name: string;
}

export class Greet extends React.Component<HelloProps, undefined> {
//                                                     ^ dla bezstanowych komponentów interfejs stanu może przyjąć undefined
    render() { 
        return <h1>{ this.props.names }</h1>
//                              ^ Error: Property 'names' does not exist on type... 
    }
}
```

Komponent dziedziczy po bazowej klasie `React.Component`, która posiada generyczny typ (o nich więcej w następnych krokach) przyjmujący interfejsy dla właściwości i stanu. Dzięki temu TypeScript może zweryfikować przekazywane właściwości i stan komponentu.

## Do zrobienia
- zrefaktoruj komponenty używane w aplikacji do TypeScript
