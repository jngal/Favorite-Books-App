# Zadanie: Favorite Books App

## Ciel

Vytvorit webovu aplikaciu v Reacte a TypeScripte na spravu oblubenych knih. Aplikacia bude bez backendu a bez perzistencie dat. Udaje budu ulozene iba v pamati aplikacie. Ako plus bude pouzity `Redux Toolkit` na spravu stavu.

## Funkcne poziadavky

### Rozlozenie

- Rozhranie bude rozdelene na dve casti.
- Vlavo bude formular na pridanie knihy.
- Vpravo bude zoznam ulozenych knih.
- Pri mensich sirkach sa rozlozenie moze prepnut z dvojstlpcoveho na jednstlpcove.

### Formular knihy

Formular bude obsahovat:

- `nazov` - povinny udaj
- `autor`
- `kratky opis` - maximalne 300 znakov
- `obrazok`

Pod formularom bude tlacidlo na ulozenie knihy do stavu aplikacie.

### Zoznam knih

- Zobrazi neobmedzeny pocet knih.
- Bude obsahovat filtrovanie podla nazvu.
- Kazda polozka bude klikatelna.
- Po kliknuti sa zobrazi modal s detailom knihy.

### Modal s detailom

Modal zobrazi udaje, ktore boli ulozene cez formular:

- nazov
- autor
- opis
- obrazok

## Technicke rozhodnutia

### Stack

- `React`
- `TypeScript`
- `Redux Toolkit` + `react-redux`
- `SASS` pre styly
- UI kniznica je volitelna, ale nie je nutna

### Navrh datoveho modelu

```ts
export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};
```

### Navrh stavu

```ts
type BooksState = {
  items: Book[];
  filter: string;
  selectedBookId: string | null;
};
```

## Navrh struktury projektu

```text
src/
  app/
    store.ts
    hooks.ts
  features/
    books/
      booksSlice.ts
      selectors.ts
      types.ts
  components/
    BookForm/
      BookForm.tsx
      BookForm.scss
    BooksList/
      BooksList.tsx
      BooksList.scss
    BookCard/
      BookCard.tsx
      BookCard.scss
    BookFilter/
      BookFilter.tsx
      BookFilter.scss
    BookDetailsModal/
      BookDetailsModal.tsx
      BookDetailsModal.scss
    Layout/
      Layout.tsx
      Layout.scss
  utils/
    validation.ts
    mappers.ts
  styles/
    _variables.scss
    _mixins.scss
    globals.scss
  App.tsx
  index.tsx
```

## Spravanie aplikacie

### Validacia

- `nazov` je povinny
- `opis` ma limit 300 znakov
- pri nevalidnom formulari sa data neulozia
- pri opise bude vhodne zobrazit pocitadlo znakov

### Obrazok

Najjednoduchsia a stabilna varianta pre toto zadanie:

- pouzit URL obrazka cez textovy input

Alternativa:

- podporit upload suboru a ulozit ho do `base64` v ramci stavu

Pre rychle a ciste splnenie zadania je rozumne zacat s `imageUrl`.

### Filtrovanie

- filtrovanie bude prebiehat v realnom case podla `title`
- porovnavanie bude case-insensitive

### Detail knihy

- klik na kartu knihy nastavi `selectedBookId`
- otvorenie modalu bude odvodene od existencie vybratej knihy v stave

## Responzivita

Minimalne breakpointy:

- `>= 1024px`: 2 stlpce
- `768px - 1023px`: 2 stlpce s mensimi medzerami
- `<= 767px`: 1 stlpec
- `320px`: vsetko musi ostat pouzitelne bez horizontalneho scrollu

Odporucania:

- pouzit `display: grid` alebo `flex`
- formularove polia a tlacidla na mobiloch roztiahnut na plnu sirku
- modal obmedzit na sirku viewportu a pridat vnutorne scrollovanie

## Implementacny plan

1. Migrovat vstupne subory z `.js` na `.tsx` a doplnit `tsconfig.json`.
2. Nastavit Redux store a `booksSlice`.
3. Vytvorit komponenty pre formular, filter, zoznam a modal.
4. Doplnit validaciu formulara a lokalny UX stav formulara.
5. Nastylovat rozlozenie cez `SASS` so zameranim na 320px sirku.
6. Dodat zakladne testy pre reducer a formular, ak ostane cas.

## Co odstranit z povodneho CRA zakladu

Tieto subory su typicky boilerplate a pre toto zadanie nie su potrebne:

- `src/logo.svg`
- `src/App.test.js`
- `src/setupTests.js`
- `src/reportWebVitals.js`
- `public/logo192.png`
- `public/logo512.png`
- `public/manifest.json`

Volitelne odstranit alebo nahradit:

- `README.md` ak je stale defaultny
- `public/favicon.ico` ak nebude pouzity vlastny branding
- `public/robots.txt` ak netreba riesit crawling

## Poznamka k aktualnemu stavu repozitara

Aktualny projekt je po `create-react-app` stale v JavaScript verzii. Kedze zadanie explicitne vyzaduje `TypeScript`, dalsi krok by mal byt realny prechod na `.ts` a `.tsx` subory, nie iba dopisanie dokumentacie.
