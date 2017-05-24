# Typescript workshop

## Przygotowanie środowiska
1. `git clone https://github.com/10clouds/typescript-workshop`
2. `cd typescript-workshop && npm install`
3. `npm start`

## Struktura projektu
```
src/
  search/
    Search.jsx - główny komponent wyszukiwarki
    trackSearch.js - serwis do komunikacji z API Spotify
    ... - reszta komponentów wyszukiwarki
  utils/ - dodatkowe funkcje niezwiązane bezpośrednio z daną funkcjonalnością
  App.jsx
  index.html
  main.jsx - entrypoint
  styles.css - wszystkie style do aplikacji
steps/ - treść kolejnych kroków
webpack.config.js - konfiguracja webpacka
```

## Kroki
1. [Babel -> TypeScript](steps/step-1.md)
2. [Proste typy](steps/step-2.md)
3. [Interfejsy](steps/step-3.md)
4. [Klasy](steps/step-4.md)
5. [Generyczne typy](steps/step-5.md)
6. [Zaawansowane typy](steps/step-6.md)
7. [Definicje typów dla bibliotek](steps/step-7.md)
8. [Więcej](steps/step-8.md)

## Rozwiązania
Rozwiązania krok po kroku dostępne są na gałęziach `step-x`, gdzie `x` to numer
kroku. Używaj ich w ostateczności. Pamiętaj, że możesz zawsze poprosić
prowadzących o pomoc i zadać pytanie.
