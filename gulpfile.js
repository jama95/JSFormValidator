const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync").create();
const gulpModifier = require("gulp-modifier");
const concat = require("gulp-concat-process");

function copy_html() {
  return gulp
    .src("./index.html")
    .pipe(
      gulpModifier(function (contents, path) {
        return contents.replace("./dist", "");
      })
    )
    .pipe(gulp.dest("./dist"));
}

function buildJS() {
  return gulp
    .src([
      "./src/ts/config.ts",
      "./src/ts/modifiers.ts",
      "./src/ts/validators/*.ts",
      "./src/ts/utils.ts",
      "./src/ts/dom.ts",
      "./src/ts/FormValidator.ts",
    ])
    .pipe(
      concat("all.ts", function (contents, file) {
        let newContents =
          `//#region ${file.stem}\n` +
          contents
            .toString()
            .replace(
              /import (type )?{([0-9a-z_, \n])+} from "[0-9a-z_./]+";/gi,
              "\n"
            )
            .replace(/export default FormValidator;/, "")
            .replace(/export /g, "")
            .replace(
              /function FormValidator/,
              "export function FormValidator"
            ) +
          `//#endregion ${file.stem}\n`;
        return newContents.replace(/\n{3,}/, "\n").replace(/\n{3,}/, "\n");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
        plugins: [
          [
            "@babel/plugin-transform-modules-umd",
            {
              globals: {
                all: "FV",
              },
              exactGlobals: true,
            },
          ],
        ],
      })
    )
    .pipe(rename({ basename: "FormValidator" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"));
}

function buildLocales() {
  return gulp
    .src("./src/ts/lang/*.ts")
    .pipe(
      gulpModifier(function (contents, path) {
        let newContents = contents.replace(
          /import (type )?{([0-9a-z_, \n])+} from "[0-9a-z_./]+";/gi,
          ""
        );
        return newContents.trim();
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js/lang"));
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

function miniLocales() {
  return gulp
    .src(["./dist/js/lang/*.js", "!./dist/js/lang/*.min.js"])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js/lang"));
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
  gulp.watch(["./src/ts/*.ts", "./src/ts/validators/*.ts"], buildJS);
  gulp.watch("./src/ts/lang/*.ts", buildLocales);
  gulp.watch("./src/css/FormValidator.scss", gulp.series(buildCSS, postCSS));
}

gulp.task(
  "default",
  gulp.parallel(
    gulp.series(buildJS, miniJS, buildLocales, miniLocales),
    gulp.series(buildCSS, postCSS, miniCSS)
  )
);
gulp.task("dev", gulp.parallel(watch, server));
gulp.task("css", gulp.series(buildCSS, postCSS, miniCSS));
gulp.task("js", gulp.series(buildJS, miniJS, buildLocales, miniLocales));
