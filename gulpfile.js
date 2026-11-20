import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import {deleteAsync} from 'del';
import gulp from 'gulp';
import changed from 'gulp-changed';
import {gulpEsbuild as esbuild} from 'gulp-esbuild';
import postcss from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import * as sassCompiler from 'sass-embedded';

const {src, dest, series, parallel, watch} = gulp;
const sass = gulpSass(sassCompiler);
const server = browserSync.create();

const paths = {
  styles: {
    entry: 'src/scss/style.scss',
    watch: 'src/scss/**/*.scss',
    dest: 'assets/css',
  },
  scripts: {
    entry: 'src/js/main.js',
    watch: 'src/js/**/*.js',
    dest: 'assets/js',
  },
  images: {
    src: 'src/images/**/*.{png,jpg,jpeg,gif,svg,webp,avif}',
    dest: 'assets/images',
  },
  // Inter's @font-face rules are inlined into style.css and point at ./files/.
  fonts: {
    src: 'node_modules/@fontsource-variable/inter/files/inter-*-wght-normal.woff2',
    dest: 'assets/css/files',
  },
  html: '*.html',
};

// Log a plugin error and end the stream, so a typo does not stop `gulp` from watching.
// The non-zero exit code still fails `npm run build` (and CI).
function logError(error) {
  console.error(error.messageFormatted ?? error.message);
  process.exitCode = 1;
  this.emit('end');
}

export const clean = () => deleteAsync(['assets']);

export const styles = () =>
  src(paths.styles.entry, {sourcemaps: true})
    .pipe(
      sass({
        // Bootstrap still uses @import internally; keep its warnings out of the console.
        quietDeps: true,
        silenceDeprecations: ['import'],
        loadPaths: ['node_modules'],
      }).on('error', logError),
    )
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.styles.dest, {sourcemaps: '.'}))
    .pipe(server.stream({match: '**/*.css'}));

export const scripts = () =>
  src(paths.scripts.entry)
    .pipe(
      esbuild({
        entryPoints: [paths.scripts.entry],
        outfile: 'app.js',
        bundle: true,
        minify: true,
        sourcemap: true,
        target: 'es2022',
      }),
    )
    .on('error', logError)
    .pipe(dest(paths.scripts.dest));

export const fonts = () => src(paths.fonts.src, {encoding: false}).pipe(dest(paths.fonts.dest));

export const images = () =>
  src(paths.images.src, {encoding: false})
    .pipe(changed(paths.images.dest))
    .pipe(dest(paths.images.dest));

const reload = done => {
  server.reload();
  done();
};

const serve = done => {
  server.init({
    server: {baseDir: './', directory: true},
    open: false,
    notify: false,
  });
  done();
};

const watchFiles = () => {
  watch(paths.styles.watch, styles);
  watch(paths.scripts.watch, series(scripts, reload));
  watch(paths.images.src, series(images, reload));
  watch(paths.html, reload);
};

export const build = series(clean, parallel(styles, scripts, fonts, images));

export default series(build, serve, watchFiles);
