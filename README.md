# byo-executor-react

A React + TypeScript + React Router + Sass frontend application that connects to the [byo-tables-service](https://github.com/peterbalazs/byo-tables-service) backend.

## Features

- **Tables list page** – displays all available tables via `QueryController` (`GET /api/tables`)
- **Table detail page** – queries and displays table data (`GET /api/query/:tableName`)
- **New Line form** – creates a new row via `NewLineOperationController` (`POST /api/operations/:tableName`)
- **Edit Line form** – updates an existing row via `UpdateLineOperationController` (`PUT /api/operations/:tableName/:id`)
- **Delete confirmation** – deletes a row via `DeleteLineOperationController` (`DELETE /api/operations/:tableName/:id`)

## Tech stack

- React 19 + TypeScript
- React Router v7
- Sass (SCSS)
- Axios
- Vite

## Getting started

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your backend URL:

```sh
cp .env.example .env
```

2. Install dependencies:

```sh
npm install
```

3. Run the dev server:

```sh
npm run dev
```

4. Build for production:

```sh
npm run build
```
