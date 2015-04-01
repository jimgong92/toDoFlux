var gulp = require('gulp');

/**
 * UTILITIES
 */
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var plugins = require('gulp-load-plugins')();
var path = {
  HTML: 'src/index.html',
  CSS: 'src/css/app.css',
  OUT: 'bundle.js',  
  MINIFIED_OUT: 'bundle.min.js',
  DEST: 'dist',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST_CSS: 'dist/css',
  ENTRY_POINT: './src/js/app.js'
};

/**
 * DEVELOPMENT TASKS
 */
gulp.task('default', ['devReplace', 'watch', 'startDB', 'serve']);

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});
//TODO: COPY SRC CSS INTO DIST CSS
gulp.task('copy-css', function(){
  gulp.src(path.CSS)
    .pipe(gulp.dest(path.DEST_CSS));
});
gulp.task('devReplace', function(){
  gulp.src(path.HTML)
    .pipe(plugins.htmlReplace({
      'js': 'src/' + path.OUT
    }))
    .pipe(gulp.dest(path.DEST));
});
gulp.task('watch', function(){
  gulp.watch(path.HTML, ['copy']);
  gulp.watch(path.CSS, ['copy-css']);

  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function(){
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));

});
gulp.task('serve', function(){
  plugins.nodemon({
    script: 'index.js'
  });
})
gulp.task('startDB', function(){
  return gulp.src('')
    .pipe(plugins.shell(['mongod']));
})