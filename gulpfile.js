const babel = require("gulp-babel");
const del = require("del");
const gulp = require("gulp");
const rollup = require("rollup");
const rename = require("gulp-rename");
const terser = require("rollup-plugin-terser");

gulp.task("build:css", () => gulp.src("./index.css").pipe(gulp.dest("dist/")));

gulp.task("build:js", done => {
  const promises = [];
  new Promise(resolve => {
    return rollup
      .rollup({
        input: "index.js",
        plugins: [babel(), terser.terser()]
      })
      .then(bundle => {
        promises.push(
          new Promise(resolve => {
            return resolve(
              bundle.write({
                file: "dist/index.iife.js",
                format: "iife",
                output: {
                  name: "typingEffect"
                }
              })
            );
          })
        );

        promises.push(
          new Promise(resolve => {
            return resolve(
              bundle.write({
                file: "dist/index.js",
                format: "esm"
              })
            );
          })
        );
      })
      .then(resolve);
  });

  return Promise.all(promises, () => done);
});

gulp.task("copy:js", () =>
  gulp
    .src("./dist/index.iife.js")
    .pipe(rename({ basename: "typing-effect" }))
    .pipe(gulp.dest("./docs/"))
);

gulp.task("clean:build", () => {
  return del(["dist/js/**/*"]);
});

gulp.task(
  "build",
  gulp.series("clean:build", "build:css", "build:js", "copy:js")
);
