const gulp = require("gulp");
const path = require("path");

const g = require("gulp-load-plugins")();

gulp.task("css", () => {
  const del = require("del");
  const hash = require("gulp-hash");
  const postcss = require("gulp-postcss");
  const sourcemaps = require("gulp-sourcemaps");

  const plugins = [
    require("postcss-easy-import"), // let's me use @import
    require("postcss-custom-properties") // add fallbacks for custom properties
  ];

  del(["build/css/**/*"]);

  return gulp
    .src("src/css/main.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins)) //post css
    .pipe(g.extractMediaQueries()) //  split out files by media query
    .pipe(hash()) // Add hashes to the files' names
    .pipe(gulp.dest("build/css")) // Write the renamed files
    .pipe(
      hash.manifest("css/assets.json", {
        // Generate the manifest file
        deleteOld: true,
        sourceDir: "css"
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/"));
});
