/*------------------------------------*\
    MODULES
\*------------------------------------*/

var gulp = require('gulp'),
	wrap = require('gulp-wrap'),
	filesToJson = require('gulp-files-to-json'),
	watch = require('gulp-watch'),
	svgmin = require('gulp-svgmin'),
	nunjucksRender = require('gulp-nunjucks-render'),
	del = require('del'),
	sass = require('gulp-sass'),
	notify = require("gulp-notify"),
	connect = require('gulp-connect');



/*------------------------------------*\
    GLOBAL VARS
\*------------------------------------*/

var FRONT_END_PATH = 'front-end',
	SVG_PATH = FRONT_END_PATH + '/svg',
	TEMPLATE_PATH = FRONT_END_PATH + '/templates',
	SCRIPT_PATH = FRONT_END_PATH + '/scripts',
	SCSS_PATH = FRONT_END_PATH + '/scss/project',
	WEB_PATH = '.public';



/*------------------------------------*\
    TASKS
\*------------------------------------*/

// Clean the web path out
gulp.task('clean-web', function(cb) {
	del([ WEB_PATH + '/*' ], function() {
		cb();
	});
});

// Find all SVG and smash into a js file
gulp.task('process-svg', function() {

	return gulp.src(SVG_PATH + '/*.svg')
				.pipe(svgmin())
				.pipe(filesToJson('_site-icons.js'))
				.pipe(wrap('var site_icons = <%= (contents) %>'))
				.pipe(gulp.dest(SCRIPT_PATH));
});

// Process all the nunjucks templates
gulp.task('process-templates', function() {

	nunjucksRender.nunjucks.configure([TEMPLATE_PATH + '/']);

	return gulp.src(TEMPLATE_PATH + '/*.html')
				.pipe(nunjucksRender())
				.pipe(gulp.dest(WEB_PATH));
});

// Process sass 
gulp.task('process-sass', function () {

	return gulp.src(SCSS_PATH + '/*.scss')
				.pipe(sass().on('error', sass.logError))
				.pipe(gulp.dest(WEB_PATH + '/css'))
				.pipe(notify("Sass Compiled :)"));
});

// Webserver 
gulp.task('webserver', function() {

	connect.server({
	    root: WEB_PATH,
	    port: 8003,
	    livereload: true
	});

});

// Live reload 
gulp.task('livereload', function () {
	
	return gulp.src( WEB_PATH + '/**/*' )
		.pipe(connect.reload());
});

// Global serve task. This task basically does everything and should be 
// called to run your webserver
gulp.task('serve', ['clean-web', 'process-svg', 'process-templates', 'process-sass'], function() {

	// Watch for changes with SVG
	watch([SVG_PATH + '/**/*.svg'], function() { gulp.start('process-svg'); });

	// Watch for changes with templates
	watch([TEMPLATE_PATH + '/**/*.html'], function() { gulp.start('process-templates'); });

	// Watch for changes with sass
	watch([SCSS_PATH + '/**/*.scss'], function() { gulp.start('process-sass'); });

	// Watch any file changes in the web path and reload
	watch([ WEB_PATH + '/**/*' ], function() { gulp.start('livereload'); });

	// Run the webserver 
	gulp.start('webserver');

});


gulp.task('default', function() {

});