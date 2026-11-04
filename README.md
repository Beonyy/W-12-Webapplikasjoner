## Generelt
Målet med applikasjonen Petz4You er å skape en tjeneste som lar kjæledyreiere og styret i et borettslag holde oversikt over de kjæledyr som hører til i borettslaget

RedwoodSDK · React 19 · Vite 8 · TypeScript 7 ·  Drizzle + D1 · Vitest · Cloudflare Workers

## Oversikt

### Funksjonalitet
- /register-pet : registrere dyr
- /search-pet : Viser en liste over alle dyr og lar deg søke etter dyr basert på søkeord som matcher datafelter.


### Hvor ting ligger

Det meste er uforandret fra starterprosjektet, men mye der ligger ubrukt.
- __Rutene__ er definert i: [src/worker.tsx](src/worker.tsx) og det er to ruter definert:
  - "/register-pet"
  - "/search-pet"
- __Databasehåndteringen__ er definert i: [src/db](src/db)
- __Komponentene__: 
  - animals: [src/app/features/animals/components](src/app/features/animals/components)
  - auth: [src/app/auth](src/app/auth)


## Arkitekturvalg

Vi valgte å prøve eksplisitt skille kodebasen inn i frontend, backend og database, med et controller-service-repository designmønster i midten for lagdeling.

Enhetstestene bruker lagdelingen for å isolere metodene. 

## Kom i gang

```bash
pnpm install   
pnpm dev       
```

Åpne `http://localhost:5173`.


```bash
pnpm migrate:dev    # lager tabellene i den lokale databasen
pnpm seed           # legger inn litt testdata
```

## Tester

```bash
pnpm test
pnpm test:watch
```
