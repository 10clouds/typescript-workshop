# Krok 1: Babel -> TypeScript

TypeScript nadzbiór ES6. Posiada wsparcie dla składni JSX, co oznacza, że możesz nim łatwo zastąpić istniejącego Babela z minimalną ilością zmian w kodzie.

Główna różnica względem Babela to sposób zarządzania domyślnymi importami. Babel w przeciwieństwie do TypeScriptu zakłada, że `module.export` to domyślny punkt eksportu.

```ts
import React from 'react'; // Babel
import * as React from 'react'; // TypeScript
```

## Do zrobienia
- zainstaluj paczki `npm install --save-dev typescript awesome-typescript-loader`
- zainstaluj pliki deklaracji dla Reacta `npm install --save @types/react @types/react-dom`
- stwórz plik `tsconfig.json` z podaną niżej konfiguracją
- w konfiguracji webpacka:
    - zastąp `babel-loader` na `awesome-typescript-loader`
    - dodaj do `resolve.extensions` rozszerzenia `ts` i `tsx`
    - usuń `babel-polyfills` z `entry.main`
- zmień rozszerzenie `src/main.jsx` na `tsx` i zaktualizuj `entry.main` w konfiguracji webpacka
- zmień sposób importu Reacta w `src/main.tsx`
- usuń nieużywane paczki związane z Babelem z `package.json`

Rozszerzenia pozostałych plików zmieniaj sukcesywanie, gdy będziesz nad nimi pracować w kolejnych krokach.

```JSON
// tsconfig.json
{
  "compilerOptions": {
    "module": "es6",
    "target": "es5",
    "allowJs": true,
    "jsx": "react",
    "strictNullChecks": true,
    "strict": true,
    "lib": ["es2015", "dom"]
  }
}
```

## Dodatkowa dokumentacja

- Lista opcji kompilera: https://www.typescriptlang.org/docs/handbook/compiler-options.html
- Dodatkowe informacje o konfiguracji TypeScriptu: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
