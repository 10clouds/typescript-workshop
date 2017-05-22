# Krok 5: Generyczne interfejsy

Interfejsy, jakie przedstawiliśmy do tej pory nie były do końca reużywalne. To wprowadzają interfejsy generyczne. Pozwalają podczas wykorzystania na przekazanie typu, który będzie mógł być wykorzystywany w deklaracji. Niektóre z nich to:

```ts
Promise<T>
React.Component<P, S>
Array<T> // znane również jako T[]
```

## Deklaracja

```ts
interface GenericIdentity<T> {
    identity: T;
    ...
}
class GenericClass<T> { ... }
function genericFn<T>(arg: T): T[] { ... }
```

Typ generyczny wymaga dodatkowego parametru, który można później wykorzystywać w deklaracji.

## Organiczenia

Możemy ograniczać przekazywane typy w następujący sposób:
```ts
interface Summable {
    sum: number;
}

function summableUtil<T extends Summable>(): T { ... }
```

## Do zrobienia
