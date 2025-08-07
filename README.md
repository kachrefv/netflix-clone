# Notflix - Next.js & Tailwind CSS

This is a Next.js project converted from a single-file HTML SPA, demonstrating a Netflix-like UI using React (with TypeScript) and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You## Build & Deployment

To build the project for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

- `pages/index.tsx`: The main application logic and UI, converted from Petite-Vue to React.
- `pages/_app.tsx`: Custom App component for global styles and font imports.
- `styles/globals.css`: Global Tailwind CSS imports and custom CSS rules.
- `tailwind.config.js`: Tailwind CSS configuration, including custom colors and fonts.
- `postcss.config.js`: PostCSS configuration for Tailwind CSS and Autoprefixer.
- `.github/workflows/build.yml`: GitHub Actions workflow to build the project on push to `main`.
