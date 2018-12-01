var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require('rename');

gulp.task('html', function() {
	gulp.src('jade/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('build'))
});

gulp.task('watch', function() {
	gulp.watch('jade/*.jade', ['html'])
});