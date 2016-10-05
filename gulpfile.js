'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const ngAnnotate = require('gulp-ng-annotate')
const sass = require('gulp-sass')

// angular concat & minification
gulp.task('js', function() {
	gulp.src(['src/main.js', 'src/**/*.js'])
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(concat('app.js'))
			.pipe(ngAnnotate())
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('client/js'))
})

// sass
gulp.task('sass', function () {
 return gulp.src('./sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./client/css'));
});

// watch
gulp.task('watch', ['js', 'sass'], function() {
	gulp.watch('src/**/*.js', ['js'])
	gulp.watch('sass/**/*.scss', ['sass'])
})