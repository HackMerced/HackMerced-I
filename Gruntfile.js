module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        options: {
            livereload: true
        },
        sass: {
            sass_front: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './public/css/style.css': './assets/css-parse/style.scss'
                }
            },
        },
        concat: {
            js_front: {
                src: [
                    './assets/js-import/*.js', // All JS in the libs folder
                    './assets/js-home/*.js', // All JS in the libs folder
                ],
                dest: './public/js/home/home.js',
            },
            scss_front: {
                src: ['./assets/css-home/*.scss', './assets/css-import/*.scss'],
                dest: './assets/css-parse/style.scss'
              },
        },
        uglify: {
            js_front: {
                src: './public/js/home/home.js',
                dest: './public/js/home/home.min.js'
            },
        },

        watch: {
            scripts: {
                files: ['./assets/js-home/*.js', './assets/js-import/*.js'],
                tasks: ['concat'/*, 'uglify'*/],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['./assets/css-home/*.scss', './assets/css-parse/*.scss'],
                tasks: ['concat', 'sass'],
                options: {
                    spawn: false,
                }
            },
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);

};
