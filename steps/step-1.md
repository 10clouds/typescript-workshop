# Krok 1: Babel -> TypeScript

TypeScript to nadzbiór ES6, posiada także wparcie dla JSX, co oznacza, że możesz nim łatwo zastąpić istniejącego Babela z minimalną ilością zmian w kodzie.

## Przejście na TypeScript

- zainstaluj TypeScript i loader dla webpack 

  ```sh
  npm install --save-dev typescript awesome-typescript-loader
  ```

- stwórz plik `tsconfig.json` z podaną konfiguracją:

  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "module": "es6",
      "moduleResolution": "node",
      "allowJs": true,
      "jsx": "react",
      "lib": ["es2015", "dom"]
    }
  }
  ```

- w konfiguracji webpacka `webpack.config.js`:
    - dodaj do `resolve.extensions` rozszerzenia `ts` i `tsx`
    - zmień `babel-loader` na `awesome-typescript-loader`
    - zmień `test` tak aby TypeScript loader obsługiwał zarówno pliki `.js`/`.jsx` jak i `.ts`/`.tsx` - `[jt]sx?`
    - usuń `babel-polyfills` z `entry.main`
- usuń nieużywane paczki związane z Babelem z `package.json`
- usuń nieużywane paczki z `node_modules` za pomocą `npm prune`
- zrestartuj webpacka

Aplikacja powinna działać tak samo jak podczas budowania Babelem, ale dalej będzie oparta o JavaScript. 
Aby móc korzystać z funkcjonalności oferowanych przez TypeScript musimy zmienić rozszerzenie pliku z `.js`/`.jsx` na `.ts`/`.tsx`, możemy robić to stopniowo.

## Zmiany w aplikacji

- zmień rozszerzenie `src/main.jsx` na `tsx`
- zmień w konfiguracji webpacka `entry.main` tak aby wskazywał na `src/main.tsx`
- zrestartuj webpacka
- spróbuj wprowadzić kilka prostych błędów w `src/main.tsx`

Aplikacja działa, mamy podstawowe wsparcie TypeScript'a, ale nie potrafi on wykryć wszystkich potencjalnych problemów. 
Na razie nie powiedzieliśmy czym są `React` i `ReactDOM`, więc TypeScript przypisał im typ `any`, co oznacza, że mogą one być wszystkim czego sobie zażyczymy.

Aby TypeScript wiedział coś więcej o zewnętrznych modułach, należy dostarczyć mu definicje tych modułów. Na razie ograniczymy się do gotowych definicji `@types/react` i `@types/react-dom` dostępnych w `npm`.

TypeScript implementuje import modułów nieco bardziej rygorystycznie niż Babel czy Webpack, nie traktuje `module.exports` jako domyślny eksport, stąd po zainstalowaniu definicji, będziemy też musieli zmodyfikować sposób importowania `React` i `ReactDOM`.

```ts
import React from 'react';       // Babel
import * as React from 'react';  // TypeScript
```

W przeciwnym wypadku TypeScript przywita nas błędami typu:

```
Module ".../typescript-workshop/node_modules/@types/react/index" has no default export.
```

## Definicje typów

- zainstaluj definicje typów dla `react` i `react-dom`

  ```sh
  npm install --save-dev @types/react @types/react-dom
  ```

- zmień sposób importu Reacta w `src/main.tsx`
- spróbuj wprowadzić kilka prostych błędów w `src/main.tsx`

To tyle jeśli chodzi o `main.tsx`, rozszerzenia pozostałych plików zmieniaj sukcesywanie, gdy będziesz nad nimi pracować w kolejnych krokach.

## Dodatkowa dokumentacja

- Lista opcji kompilera: https://www.typescriptlang.org/docs/handbook/compiler-options.html
- Dodatkowe informacje o konfiguracji TypeScriptu: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

## [Krok 2: Proste typy ➜](./step-2.md)
