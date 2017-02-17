var gulp = require('gulp');
var inlineResources = require('./scripts/inline-resources');

gulp.task('copy-and-inline-resource', copyHtml);

function copyHtml() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('./dist/')).on('end', copyScss);
}

function copyScss() {
    gulp.src('./src/**/*.less')
        .pipe(gulp.dest('./dist/')).on('end', inlineResource);
}

gulp.task('copy:readme', () => gulp.src('./README.md').pipe(gulp.dest('./dist/')));

function inlineResource() {
    inlineResources('./dist/');
}

gulp.task('default', ['copy-and-inline-resource', 'copy:readme']);