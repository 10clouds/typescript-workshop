# Krok 8: Więcej

W poprzednich krokach zrefaktorowaliśmy tylko część aplikacji. Dzięki wiedzy poznanej na warsztatach możesz dokończyć ten proces. Ponadto poniżej znajdziesz kilka dodatkowych zadań polegających na dodaniu pewnych funkcjonalności aplikacji, które pozwolą Ci lepiej poznać TypeScript:

- włącz tryb `strict` w opcjach kompilatora (`tsconfig.json`):
    
    ```json
    {
        ...
        "compilerOptions": {
            ...
            "strict": true
        }
    }
    ```
    
    TypeScript będzie informować Cię o większej liczbie potencjalnych błędów. Jeżeli w konsoli zobaczysz dodatkowe błędy, postaraj się je rozwiązać.

- dodaj blokowanie przycisków paginacji w czasie oczekiwania na odpowiedź z API spotify po kliknięciu, aby uniknąć wyścigu zapytań, gdy użytkownik kilka razy kliknie, np. `Next`

- pozwól na wyszukiwanie również albumów i artystów, konieczna do tego będzie przebudowa paginacji do śledzenia przesunięcia stron zamiast linków next/prev jak do tej pory

- dodaj zapisywanie tekstu wyszukiwania do adresu strony w formie query stringu (`localhost:8080?q=rolling+stones`). Nie zapomnij o jego odtwarzaniu, aby w momencie wejścia na stronę pole wyszukiwania było wypełnione zgodnie z parametrem `q` i zostały wyświetlone odpowiednie wyniki.

- jeżeli czujesz, że to jeszcze za mało to proponujemy rozbudowę aplikacji o widok albumu i artysty
