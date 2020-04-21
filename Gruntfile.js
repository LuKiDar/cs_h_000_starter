'use strict';
module.exports = function(grunt) {
    const sass = require('node-sass');
    
    require('load-grunt-tasks')(grunt);
 
    grunt.initConfig({

        /*
         * Clean app folder
         */
        clean: {
            all: ['app']
        },

        /*
         * Copy images, fonts and vendor JS, CSS files
         */
        copy: {
            fontawesome: {
                files: [
                    {
                        cwd: 'node_modules/@fortawesome/fontawesome-free/webfonts',
                        expand: true,
                        src: ['*'],
                        dest: 'src/fonts/fontawesome'
                    },
                    {
                        cwd: 'node_modules/@fortawesome/fontawesome-free/scss',
                        expand: true,
                        src: ['*'],
                        dest: 'src/sass/vendor/fontawesome'
                    }
                ]
            },
            slick: {
                files: [
                    {
                        cwd: 'node_modules/slick-carousel/slick',
                        expand: true,
                        src: ['ajax-loader.gif'],
                        dest: 'src/img/slick'
                    },
                    {
                        cwd: 'node_modules/slick-carousel/slick/fonts',
                        expand: true,
                        src: ['*'],
                        dest: 'src/fonts/slick'
                    },
                    {
                        cwd: 'node_modules/slick-carousel/slick',
                        expand: true,
                        src: ['slick.scss', 'slick-theme.scss'],
                        dest: 'src/sass/vendor/slick'
                    },
                    {
                        cwd: 'node_modules/slick-carousel/slick',
                        expand: true,
                        src: ['slick.js'],
                        dest: 'src/js/vendor/slick'
                    }
                ]
            },
            app: {
                files: [
                    { expand: true, cwd: 'src/js/vendor/', src: ['**'], dest: 'app/js/vendor/' },
                    { expand: true, cwd: 'src/sass/vendor/', src: ['**'], dest: 'app/css/vendor/' },
                    { expand: true, cwd: 'src/img/', src: ['**'], dest: 'app/img/' },
                    { expand: true, cwd: 'src/fonts/', src: ['**'], dest: 'app/fonts/' }
                ]
            }
        },
        
        /*
         * JS Validation
         */
        jshint: {
            all: [ 'Gruntfile.js', 'src/js/source/*.js' ],
            options: {
                "bitwise": true,
                "browser": true,
                "curly": true,
                "eqeqeq": true,
                "eqnull": true,
                "esnext": true,
                "immed": true,
                "jquery": true,
                "latedef": false,
                "newcap": false,
                "noarg": true,
                "node": true,
                "strict": false,
                "trailing": false,
                "undef": false,
                "devel": true,
                "globals": {
                    "jQuery": true,
                    "alert": true
                }
            }
        },
        
        /*
         * JS concatenation
         */
        concat: {
            options: { separator: ';\n', },
            dist: { src: ['src/js/source/*.js'], dest: 'app/js/cs__main.js' }
        },
        
        /*
         * JS minification
         */
        uglify: {
            dist: {
                files: { 'app/js/cs_main.min.js': ['app/js/cs__main.js'] }
            }
        },

        /*
         * SASS compilation
         */
        sass: {
            options: {
                implementation: sass,
                precision: 5,
            },
            dist: {
                files: { 'app/css/cs__main.css': 'src/sass/source/global.scss' }
            }
        },

        /*
         * POSTCSS plugins
         */
        postcss: {
            prefix: {
                options: {
                    processors: [
                        require('mqpacker')(),
                        require('autoprefixer')(),
                    ]
                },
                src: 'app/css/cs__main.css',
                dest: 'app/css/cs__main.css'
            },
            /*minify: {
                options: {
                    processors: [
                        require('cssnano')({
                            preset: ['default', { discardComments: { removeAll: true } }]
                        })
                    ]
                },
                src: 'app/css/cs__main.css',
                dest: 'app/css/cs__main.min.css'
            }*/
        },

        /*
         * HTML compilation
         */
        htmlbuild: {
            dist: {
                src: 'src/*.html',
                dest: 'app/',
                options: {
                    beautify: true,
                    logOptions: true,
                    sections: {
                        parts: {
                            header: 'src/parts/header.html',
                            footer: 'src/parts/footer.html',
                        },
                        index: {
                            intro: 'src/parts/sections/intro.html',
                        }
                    },
                }
            }
        },

        /*
         * HTML validation
         */
        htmllint: {
            all: [ 'app/*.html' ]
        },

        /*
         * Watch files for changes
         */
        watch: {
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'concat'] //'uglify'
            },
            css: {
                files: [
                    'src/sass/*',
                    'src/sass/**/*'
                ],
                tasks: ['sass', 'postcss']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['htmlbuild'] //'htmllint'
            },
        },





        /*
         * Sync browser after files are cnahged
         */
        /*browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'app/css/*.css',
                        'app/js/*.js',
                        'app/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: "127.0.0.1/cs_h_001/app"
                }
            }
        },*/
        
        /*
         * Run tasks concurrently
         */
        /*concurrent: {
            dev: [ 'watch' ],
            options: { logConcurrentOutput: true }
        },*/

    });

    /*
     * Register tasks
     */
    grunt.registerTask('default', [
        'clean',
        'copy',
        'jshint',
        'concat',
        //'uglify',
        'sass',
        'postcss',
        'htmlbuild',
        'watch',
        
        // 'concurrent:dev'
        //'htmllint',
        //'browserSync',
    ]);

};