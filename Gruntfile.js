'use strict';

module.exports = function ( grunt ) {
	/* configure grunt */

	var
	srcDir 		= 'lib/',
	lessDir		= srcDir + 'css/',
	srcFile		= srcDir + 'index.js',
	srcFiles 	= srcDir + '**/*.js',
	lessFile	= lessDir + 'index.less',
	lessFiles	= lessDir + '**/*.less',
	destDir 	= 'dist/',
	outFile 	= destDir + '<%= pkg.name %>.js',
	implDir 	= 'impl/',
	implFiles 	= implDir + '**/*';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			lib: {
				files: [ srcFiles, lessFiles ],
				tasks: [ 'jshint:all' , 'browserify:main', 'less:dev' ]
			},
			impl: {
				files: [ implFiles ],
				options: {
					livereload: true
				}
			}
		},
		less: {
			main: {
				files: {
					'dist/liwi.css' : lessFile
				},
				options: {
					path: [ lessDir ],
					sourceMap: true,
					cleancss: true
				}
			},
			dev: {
				files: {
					'dist/liwi.css' : lessFile
				}
			}
		},
		jshint: {
			all: ['Gruntfile.js', srcFiles ],
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},
		browserify: {
			main: {
				src: [ srcFile ],
				dest: outFile,
				options: {
					debug: true,
					browserifyOptions: {
						standalone: 'Liwi',
					}
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js' : [ outFile ]
				}
			},
			options: {
				sourceMap: true
			}
		}
	});

	/* load plugins */
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	/* grunt tasks */
	grunt.registerTask('default' , [
		'less',
		'jshint',
		'browserify',
		'uglify'
	]);
};
