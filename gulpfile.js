const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync").create();

function copy_html() {
  return gulp.src("./index.html").pipe(gulp.dest("./dist"));
}

function buildJS() {
  return gulp
    .src("./src/js/FormValidator.ts")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"));
}

function miniJS() {
  return gulp
    .src("./dist/js/FormValidator.js")
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"));
}

function buildCSS() {
  return gulp
    .src("./src/css/FormValidator.scss")
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"));
}

function postCSS() {
  const contextOptions = { nano: false };
  return gulp
    .src("./dist/css/FormValidator.css")
    .pipe(postcss(contextOptions))
    .pipe(gulp.dest("./dist/css"));
}

function miniCSS() {
  const contextOptions = { nano: true };
  return gulp
    .src("./dist/css/FormValidator.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(contextOptions))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"));
}

function reload() {
  browserSync.reload();
}

function server(done) {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    open: false,
  });
  gulp.watch(
    [
      "./dist/index.html",
      "./dist/js/FormValidator.js",
      "./dist/css/FormValidator.css",
    ],
    reload
  );
}

function watch() {
  gulp.watch("./index.html", copy_html);
  gulp.watch("./src/js/FormValidator.ts", buildJS);
  gulp.watch("./src/css/FormValidator.scss", gulp.series(buildCSS, postCSS));
}

gulp.task(
  "default",
  gulp.parallel(
    gulp.series(buildJS, miniJS),
    gulp.series(buildCSS, postCSS, miniCSS)
  )
);
gulp.task("dev", gulp.parallel(watch, server));
gulp.task("css", gulp.series(buildCSS, postCSS, miniCSS));
gulp.task("js", gulp.series(buildJS, miniJS));
