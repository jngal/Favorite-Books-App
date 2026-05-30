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
  data: Book[];
};
```

## Navrh struktury projektu

```text
src/
  components/
    common/
      MUIWrappers...
    book/
      BookForm.tsx
      BooksList.tsx
      BookCard.tsx
      BookDetailsModal.tsx
  hooks/
    useRedux.ts
    useReduxForm.ts
  store/
    mockedData/
      book.json
    slice/
      books.slice.ts
  hepers/
    xxx.helpers.ts
  locales/
    en/
      book.json
    sk/
      book.json
  styles/
    styles....
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
