/**
 * Created by nons3ns on 22.04.2018.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\r\n'
            },
            styles: {
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'node_modules/glyphicons/styles/glyphicons.css',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
                    'node_modules/highcharts/css/highcharts.css',
                    'node_modules/material-icons/css/material-icons.min.css',
                    'node_modules/angular-material/angular-material.min.css',
                    'src/css/styles.css'
                ],
                dest: 'dist/styles.css'
            },
            scripts: {
                options: {
                    separator: '\r\n ; \r\n '
                },
                src: ['src/js/*.js', 'src/**/*.js'],
                dest: 'dist/scripts.js'
            },
            vendor: {
                options: {
                    separator: '\r\n ; \r\n '
                },
                src: [
                    'node_modules/jquery/jquery.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-aria/angular-aria.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'node_modules/angular-messages/angular-messages.min.js',
                    'node_modules/angular-material/angular-material.min.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                    'node_modules/highcharts/js/highcharts.js',
                    'node_modules/glyphicons/glyphicons.spec.js'
                ],
                dest: 'dist/vendor.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['concat']);

};