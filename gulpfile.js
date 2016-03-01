//SET UP ALL THE REQUIRED GULP PLUGINS
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  jade = require('gulp-jade'), //Time to play with Jade again, but after the test, so ignore it for now.
  gutil = require('gulp-util'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  zip = require('gulp-zip'),
  minify = require('gulp-minify');


// Starts a Browser-Sync Static Server & Watch for scss/html/js file changes
gulp.task('jarvis', ['sass'], function() {
  browserSync.init({
    server: "./"
  });
  // Makes Jarvis watch for file changes -

  // Jarvis runs the sass task to compile and inject css into our dev browser
  gulp.watch("./src/scss/**/*.scss", ['sass']);
  // and reloads the browser when any html or javascript changes in any .
  gulp.watch(["*.html", "*.js"]).on('change', browserSync.reload);
  gutil.log('Live Reload browser sync is running and its contents will hot reload. Press ctrl+c to quit the process');
});

// Compiles sass into CSS, run autoprefix, write sourcemaps & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("./src/scss/**/*.scss")
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer("last 2 version", "> 1%", "ie 8", "ie 7"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./src/jade/'))
});

//Look! It's ES6 arrow function syntax!
gulp.task('imagemin', () => {
  return gulp.src('src/product-images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/product-images'));
});

gulp.task('compress', function() {
  gulp.src('src/js/*.js')
    .pipe(minify({
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('zip', () => {
  return gulp.src('./**/*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['sass', 'compress', 'imagemin']);

gulp.task('default', ['jarvis']);
