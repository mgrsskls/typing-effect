const babel = require("gulp-babel");
const del = require("del");
const gulp = require("gulp");
const rollup = require("rollup");
const terser = require("rollup-plugin-terser");

const folders = {
  src: {
    js: "./docs"
  },
  build: {
    js: "./docs/js"
  }
};

gulp.task("build:css", () => gulp.src("./index.css").pipe(gulp.dest("dist/")));

gulp.task("build:js", () => {
  return rollup
    .rollup({
      input: "index.js",
      plugins: [babel(), terser.terser()]
    })
    .then(bundle => {
      return bundle.write({
        file: "dist/index.js",
        format: "esm"
      });
    });
});

gulp.task("build:demoJs", () => {
  return rollup
    .rollup({
      input: `${folders.src.js}/index.js`,
      plugins: [babel(), terser.terser()]
    })
    .then(bundle => {
      return bundle.write({
        file: `${folders.build.js}/index.js`,
        format: "iife",
        sourcemap: true
      });
    });
});

gulp.task("clean:demo", () => {
  return del(["docs/js/**/*"]);
});

gulp.task("clean:build", () => {
  return del(["dist/js/**/*"]);
});

gulp.task(
  "build:demo",
  gulp.series("clean:demo", gulp.parallel("build:demoJs"))
);
gulp.task(
  "build",
  gulp.series(
    "clean:build",
    gulp.parallel("build:css"),
    gulp.parallel("build:js")
  )
);
