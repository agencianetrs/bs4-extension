const gulp = require('gulp')
const del = require('del')
const sass = require('gulp-sass')
const wait = require('gulp-wait')
const rename = require('gulp-rename')
const {
    parallel,
    dest
} = require('gulp')
const {
    src,
    series
} = gulp

// paths

const paths = {
    src: {
        _root: 'src',
        styles: {
            sass: 'src/sass'
        },
    },
    dist: {
        _root: 'dist',
        css: 'dist/css'
    }
}

// clean task

const clean = () => del([`${paths.dist._root}/**/*`])

// sass task

const compileSASS = () => src(`${paths.src.styles.sass}/bs4-extension.scss`)

    // min

    .pipe(wait(500))
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: ['node_modules/']
    }).on('error', sass.logError))
    .pipe(rename('bs4-extension.min.css'))
    .pipe(dest(paths.dist.css))

    // default

    .pipe(wait(500))
    .pipe(sass({
        includePaths: ['node_modules/']
    }).on('error', sass.logError))
    .pipe(rename('bs4-extension.css'))
    .pipe(dest(paths.dist.css))

// public task

exports.default = series(clean, parallel(compileSASS))