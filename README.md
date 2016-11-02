# gulp-lebab

gulp plugin for [lebab](https://github.com/lebab/lebab).
Turn your ES5 code into readable ES6.

Installation
---

```bash
$ npm install gulp-lebab
```

Example
---

```js
var gulp   = require('gulp');
var glebab = require('gulp-lebab');
var print  = require('gulp-print');
var gutil  = require('gulp-util');

gulp.task('js', function() {
  return gulp.src([
        '!node_modules/**', 
        '!public/**', 
        '!view/**',
        './**/*.js'
      ])               
      .pipe(print())                           
      .pipe(glebab())
      .on('error', gutil.log)    
      .pipe(gulp.dest('build'));               
});
```