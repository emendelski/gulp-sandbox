var paths = {
    build: {
        js: 'build/js',
        css: 'build/scss',
        cssPages: 'build/scss/pages/**/*',
        images: 'build/images',
    },
    output: {
        root: '',
        js: 'assets/js',
        css: 'assets/css',
        cssPages: 'assets/css',
        cssVendor: 'assets/css/vendor',
        images: 'assets/images',
        fonts: 'assets/fonts'
    },
    bower: 'bower_components',
    main: 'build/js/functions.js'
};

exports.paths = paths;

exports.js = [
    paths.build.js + '/functions.js'
];

exports.copy = [
    paths.build.bower + '/jquery/dist/jquery.min.js'
];

// console.log(exports.js);