# Favorite-Books-App

Frontend web application built with React and TypeScript for managing favorite books.

## Features

- Add a new book with:
  - title (required)
  - author
  - short description (max 300 characters)
  - image
- Upload image from local device and store it as `base64`
- Filter books by title
- Sort books by newest / oldest
- Open book details in a modal
- Delete a book
- Light / dark theme switch
- EN / SK language switch

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Redux
- React Hook Form
- Yup
- Material UI
- i18next / react-i18next
- SASS / SCSS

## Project Notes

- The project is frontend-only.
- No backend or database is included, as persistence was not required by the assignment.
- Book data is stored in application memory using Redux.
- Initial mock data is loaded from `src/store/mockedData/books.json`.

## Run Locally

```bash
npm install
npm start
```
