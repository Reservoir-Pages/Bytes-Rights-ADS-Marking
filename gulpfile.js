// Gulp
const { src, dest, series, watch }  = require('gulp'); // подключаем функции gulp

const gulpif            = require('gulp-if'); // условие если
// Удаление
const del               = require('del'); // удаление директорий и файлов
// Создание спрайта
const svgSprite         = require('gulp-svg-sprite'); // создания SVG-спрайта
const svgmin            = require('gulp-svgmin'); //
const cheerio           = require('gulp-cheerio'); //
const replace           = require('gulp-replace'); // поиск и замена
// Работа с HTML
const fileInclude       = require('gulp-file-include'); //
const typograf          = require('gulp-typograf'); //
const htmlMin           = require('gulp-htmlmin'); // минификация html
const version           = require('gulp-version-number'); //
// Работа с CSS/SCSS
const sass              = require('gulp-sass')(require('sass')); //
const autoprefixer      = require('gulp-autoprefixer'); // расстановка префиксов
const cleanCSS          = require('gulp-clean-css'); // чистка файлов стилей
// Работа с JS
const webpack           = require('webpack'); // ??????????????????????????????????
const webpackStream     = require('webpack-stream'); //
const uglify            = require('gulp-uglify-es').default; // для обфускации кода(делает код не читаемым)
// Создание карт файлов
const sourcemaps        = require('gulp-sourcemaps'); // работа с sourcemaps
// Обработка ошибок
const plumber           = require('gulp-plumber'); // обработка ошибок
const notify            = require('gulp-notify'); // показывает ошибки и подсказки сборки
// Обновление страницы
const browserSync       = require('browser-sync').create() // browser-sync, как гласит спека добавляем .create()
// Шрифты
const ttf2woff2         = require('gulp-ttf2woff2'); //
const ttf2woff          = require('gulp-ttf2woff'); //
// Изображения
const image             = require('gulp-imagemin'); // оптимизация изображений // version 6.3.1 no work need to setup 6.2.1
const webp              = require('gulp-webp'); //
// Deploy
const ftp               = require('vinyl-ftp'); //
const gutil             = require('gulp-util'); //
const fs                = require('fs'); //
// Zip
const zip               = require('gulp-zip'); //
const path              = require('path'); // получение пути к папке проекта
const rootFolder        = path.basename(path.resolve()); // получение названия папки проекта
// Variable
const srcFolder = './src';
const distFolder = './dist';
const buildFolder = './build';
const jsFileName = 'main.js';
const paths = {
  srcImagesFolder:      `${srcFolder}/images`,
  srcSvgFolder:         `${srcFolder}/images/svg`,
  srcResourcesFolder:   `${srcFolder}/resources`,
  srcFontsFolder:       `${srcFolder}/resources/fonts`,
  srcScriptsFolder:     `${srcFolder}/scripts`,
  srcStylesFolder:      `${srcFolder}/styles`,

  distStyleFolder:      `${distFolder}/styles`,
  distScriptsFolder:    `${distFolder}/scripts`,
  buildStylesFolder:    `${buildFolder}/styles`,
  buildScriptsFolder:   `${buildFolder}/scripts`,
};
let isProd = false;
// Tasks
const toProd = (done) => {
  isProd = true;
  done();
};

const clean = () => {
  return del(!isProd ? distFolder : buildFolder)
};

const fontsTtfToWoff2 = () => {
  return src(`${paths.srcFontsFolder}/**/*.*`)
  .pipe(plumber(notify.onError({
    title: "FONTS",
    message: "Error: <%= error.message %>"
  })))
  .pipe(ttf2woff2())
  .pipe(dest(paths.srcFontsFolder))
}

const resources = () => {
  return src([
    `${paths.srcResourcesFolder}/**`,
    '!./**/*.+(ttf|woff)',
  ])
  .pipe(dest(!isProd ? distFolder : buildFolder))
};
//???
const svgSprites = () => {
  return src(`${paths.srcSvgFolder}/**/*.svg`)
    // .pipe(
    //   svgmin({
    //     js2svg: {
    //       pretty: true,
    //     },
    //   })
    // )
    // .pipe(
    //   cheerio({
    //     run: function ($) {
    //       // $('[fill]').removeAttr('fill');
    //       // $('[stroke]').removeAttr('stroke');
    //       // $('[style]').removeAttr('style');
    //     },
    //     parserOptions: {
    //       xmlMode: true
    //     },
    //   })
    // )
    // .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../../sprite.svg"
        }
      },
    }))
    .pipe(dest(paths.srcSvgFolder));
}

const imagesToWebp = () => {
  src([`${paths.srcImagesFolder}/**`, `!${paths.srcSvgFolder}/**`])
  .pipe(plumber(notify.onError({
    title: "IMAGES",
    message: "Error: <%= error.message %>"
  })))
  .pipe(gulpif(isProd, image({
    interlaced: true,
    progressive: true,
    quality: 70,
    optimizationLevel: 5
  })))
  .pipe(dest(!isProd ? `${distFolder}/images` : `${buildFolder}/images`))
  return src([`${paths.srcImagesFolder}/**`, `!${paths.srcSvgFolder}/**`])
    .pipe(webp({
      quality: isProd ? 70 : null,
      // lossless: true,
    }))
    .pipe(dest(!isProd ? `${distFolder}/images` : `${buildFolder}/images`))
};

const styles = () => {
  return src(`${paths.srcStylesFolder}/**/*.scss`)
  .pipe(plumber(notify.onError({
    title:"SCSS",
    message: "Error: <%= error.message %>"
  })))
  .pipe(gulpif(!isProd, sourcemaps.init()))
  // dev & backend - no compressed
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false,
    grid: true,
    overrideBrowserslist: ["last 5 versions"]
  }))
  //? backend - no sourcemap
  .pipe(gulpif(!isProd, sourcemaps.write('sourcemaps/')))
  .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
  .pipe(dest(!isProd ? paths.distStyleFolder : paths.buildStylesFolder))
  .pipe(gulpif(!isProd, browserSync.stream()))
}

const scripts = () => {
  return src(`${paths.srcScriptsFolder}/main.js`)
    .pipe(plumber(notify.onError({
      title: "JS",
      message: "Error: <%= error.message %>"
    })))
    .pipe(webpackStream({
      mode: isProd ? 'production' : 'development',
      output: {
        filename: jsFileName,
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      //? backend - false
      devtool: !isProd ? 'source-map' : false
    }))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(dest(!isProd ? paths.distScriptsFolder : paths.buildScriptsFolder))
    .pipe(gulpif(!isProd, browserSync.stream()));
}

const html = () => {
  return src(`${srcFolder}/*.html`)
    .pipe(plumber(notify.onError({
      title:"HTML",
      message: "Error: <%= error.message %>"
    })))
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(gulpif(isProd, version({
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': 'all'
      },
      'output': {
        'file': 'version.json'
      }
    })))
    .pipe(gulpif(isProd, htmlMin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(dest(!isProd ? distFolder : buildFolder))
    .pipe(gulpif(!isProd, browserSync.stream()));
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: !isProd ? distFolder : buildFolder,
    },
  });

  watch(`${paths.srcImagesFolder}/**`, imagesToWebp);
  watch(`${paths.srcImagesFolder}/svg/**`, svgSprites);
  watch(`${paths.srcResourcesFolder}/**`, resources);
  watch(`${paths.srcScriptsFolder}/**`, scripts);
  watch(`${paths.srcStylesFolder}/**`, styles);
  watch(`${srcFolder}/**/*.html`, html);
};
// DEPLOY //
const deploy = () => {
  let ftpData = JSON.parse(fs.readFileSync('ftp-data.json', 'utf-8'));
  let connect = ftp.create({
    host: ftpData.host,
    user: ftpData.user,
    password: ftpData.password,
    parallel: 10,
    log: gutil.log,
  });

  return src(`${buildFolder}/**`, {})
  .pipe(plumber(notify.onError({
    title: "DEPLOY",
    message: "Error: <%= error.message %>"
  })))
  .pipe(connect.newer(ftpData.folder))
  .pipe(connect.dest(ftpData.folder));
}
// ZIP //
const zipFiles = () => {
  del(`${rootFolder}.zip`);
  return src(`${buildFolder}/**`, {})
  .pipe(plumber(notify.onError({
    title: "ZIP",
    message: "Error: <%= error.message %>"
  })))
  .pipe(zip(`${rootFolder}.zip`))
  .pipe(dest('./'));
}
exports.default = series(clean, fontsTtfToWoff2, resources, svgSprites, imagesToWebp, styles, scripts, html, watchFiles);
exports.build = series(toProd, clean, fontsTtfToWoff2, resources, svgSprites, imagesToWebp, styles, scripts, html);
exports.backend = series(clean, fontsTtfToWoff2, resources, svgSprites, imagesToWebp, styles, scripts, html);
exports.deploy = deploy;
exports.zipFiles = zipFiles;
