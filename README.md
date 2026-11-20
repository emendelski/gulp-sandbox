# gulp-sandbox

> Gulp sandbox for static HTML, SCSS and JavaScript

[![CI](https://github.com/emendelski/gulp-sandbox/actions/workflows/ci.yml/badge.svg)](https://github.com/emendelski/gulp-sandbox/actions/workflows/ci.yml)

## What's inside

- **[Gulp 5](https://gulpjs.com/)** with [Browsersync](https://browsersync.io/) live reload
- **[Bootstrap 5.3](https://getbootstrap.com/)** compiled from Sass (sass-embedded) with
  [Autoprefixer](https://github.com/postcss/autoprefixer) and [cssnano](https://cssnano.github.io/cssnano/)
- **[esbuild](https://esbuild.github.io/)** bundling and minifying JavaScript
- **[imagemin](https://github.com/sindresorhus/gulp-imagemin)** optimizing PNG, JPEG, GIF and SVG
- Self-hosted [Inter](https://fontsource.org/fonts/inter) variable font
- **[ESLint](https://eslint.org/)**, **[Stylelint](https://stylelint.io/)** and
  **[Prettier](https://prettier.io/)**

## Requirements

Node.js 26+ (see `.nvmrc`).

## Usage

```bash
# install dependencies
npm install

# build, then serve at http://localhost:3000 with live reload
npm run dev

# production build to assets/
npm run build

# lint JavaScript and SCSS
npm run lint

# format all files (or check formatting with format:check)
npm run format
```

## Structure

- `*.html` – pages, served from the project root
- `src/scss/style.scss` – stylesheet entry; Bootstrap overrides go to `_variables.scss`, and
  `lib/_bootstrap.scss` selects which Bootstrap parts are compiled
- `src/js/main.js` – JavaScript entry, bundled into `assets/js/app.js`
- `src/images/` – images, optimized into `assets/images/`
- `assets/` – build output (ignored by git)

Browser targets come from the `browserslist` field in `package.json`.
