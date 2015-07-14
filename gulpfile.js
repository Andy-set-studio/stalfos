/*------------------------------------*\
    MODULES
\*------------------------------------*/

var gulp = require('gulp'),
	wrap = require('gulp-wrap'),
	filesToJson = require('gulp-files-to-json'),
	watch = require('gulp-watch'),
	svgmin = require('gulp-svgmin'),
	nunjucksRender = require('gulp-nunjucks-render');



/*------------------------------------*\
    GLOBAL VARS
\*------------------------------------*/

var SVG_PATH = 'svg',
	TEMPLATE_PATH = 'templates',
	SCRIPT_PATH = 'scripts',
	WEB_PATH = '.web';



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


// Global serve task. This task basically does everything and should be 
// called to run your webserver
gulp.task('serve', ['process-svg', 'process-templates'], function() {

	// Watch for changes with SVG
	watch([SVG_PATH + '/**/*.svg'], function() { gulp.start('process-svg'); });

	// Watch for changes with templates
	watch([TEMPLATE_PATH + '/**/*.html'], function() { gulp.start('process-templates'); });
});


gulp.task('default', function() {

});