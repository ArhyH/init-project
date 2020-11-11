var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("css", function() {
  return gulp.src("source/styles/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/styles/**/**/*.scss", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));


// let gulp = require('gulp');
// let plumber = require('gulp-plumber');
// let sourcemap = require('gulp-sourcemaps');
// let sass = require('gulp-sass');
// let postcss = require('gulp-postcss');
// let autoprefixer = require('autoprefixer');
// let server = require('browser-sync').create();

// gulp.task('scss', function() {
//   return gulp.src('dev/style/**/*.scss')
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss())
//     .pipe(autoprefixer({
//       browsers: ['last 2 versions']
//     }))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest(""))
//     .pipe(server.stream());

// })

// gulp.task("server", function() {
//   server.init({
//     server: "dev/pages",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });
//   gulp.watch("source/styles/**/**/*.scss", gulp.series("css"));
//   gulp.watch("source/*.html").on("change", server.reload);
// });

// gulp.task("start", gulp.series("css", "server"));
