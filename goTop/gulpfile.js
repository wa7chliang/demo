var gulp = require('gulp'),
	ugLify = require('gulp-uglify'),
	changed = require('gulp-changed'),
	concat = require('gulp-concat'),
	browserSync = require("browser-sync").create();

// 压缩js
gulp.task("script", function () {
	gulp.src(['src/js/goTop.js'])
		.pipe(changed('dist/js', { hasChanged: changed.compareSha1Digest }))
		.pipe(concat('goTop.min.js'))
		.pipe(ugLify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({ stream: true }));
});

//启动热更新  
gulp.task('serve', function () {
	gulp.start('script');
	browserSync.init({
		port: 2018,
		server: {
			baseDir: ['dist']
		}
	});
	gulp.watch('dist/js/*.js', ['script']);         //监控文件变化，自动更新  
});

gulp.task('default', ['serve']);