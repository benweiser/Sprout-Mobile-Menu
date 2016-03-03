module.exports = function(grunt) {
    grunt.initConfig({
        // Watch task config
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                //     files: "*.scss",
                files: '**/*.scss',
                tasks: ['sass', 'autoprefixer' ]
            },
            concat: {
                files: 'src/js/*.js',
                tasks: ['concat']
            },
            uglify: {
                files: 'src/js/*.js',
                tasks: ['uglify']
            }
        },
        // SASS task config
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },

                files: {
                    // destination         // source file
                    "dist/css/sprout-mobile-menu.css": "src/scss/sprout-mobile-menu.scss"
                }
            }
        },
        autoprefixer: {
                options: {
                browsers: ['last 2 version'],
                map: true
            },
            dist: {
                files: {
                    'dist/css/sprout-mobile-menu.css': 'dist/css/sprout-mobile-menu.css'
                }
            }
        },

        concat: {
            basic_and_extras: {
                files: {
                    //'src/js/sprout-mobile-menu.js': [
                        //'src/mobile-menu.js',
                        //'src/top-bar.js',
                        //'src/src.js'
                //    ],
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/js/sprout-mobile-menu.min.js': ['src/js/sprout-mobile-menu.js']
                }
            }
        },

        // inside Gruntfile.js
        // Using the BrowserSync Proxy for your existing website url.
        browserSync: {
            default_options: {
                bsFiles: {
                    src: [
                        "*.css",
                        "*.html",
                        "js/*.js",
                        "src/*.js"
                    ]
                },
                options: {
                    watchTask: true,
                    // change this to your project's location example localhost/myproject, or www.yourprojectname.dev
                    proxy: "www.sprout.dev/",
                    tunnel: "local" // < Used for iPhone testing
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    // register a default task.
    grunt.registerTask('default', ['browserSync', 'watch']);
};