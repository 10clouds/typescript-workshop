# Krok 5: Generyczne interfejsy

Interfejsy przedstawione do tej pory nie były do końca reużywalne. Możemy je rozszerzać podobnie do klas używając słowa `extend`, jednak cały czas nie pozwalają na przekazanie innego typu jako parametr. Taką funkcjonalność zapewniają interfejsy generyczne. Pozwalają podczas wykorzystania na przekazanie typu, który będzie mógł być wykorzystywany w dalszej deklaracji. Przykładowe generyki, używane w poprzednich krokach:

```ts
Promise<T>
React.Component<P, S>
Array<T> // znane również jako T[]
```

## Deklaracja
Definicja typu generycznego różni się dodatkowymi nawiasami ostrymi występującymi po nazwie typu. Możemy poprosić o przekazanie wielu argumentów, jak w przypadku `Component`. Następnie nazwę typu można wykorzystywać dalej w deklaracji.

```ts
interface GenericIdentity<T> {
    identity: T;
    ...
}
class GenericClass<T, U> { ... }
function genericFn<T>(arg: T): T[] { ... }
```

## Ograniczenia

Przekazywane typy można ograniczać. W poniższym przykładzie akceptowane są tylko typy posiadające pole `sum`.

```ts
interface Summable {
    sum: number;
}

function summableUtil<T extends Summable>(): T { ... }
```

## Zadanie

Stwórz generyczny interfejs dla obiektu stronnicowania będącego częścią odpowiedzi z API spotify w `src/trackSearch`.
