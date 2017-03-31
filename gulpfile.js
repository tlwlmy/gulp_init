var gulp = require('gulp');

var uglify = require('gulp-uglify');    // js文件压缩
var jshint = require('gulp-jshint');    // js代码检查
var concat = require('gulp-concat');    // 文件合并
var minifycss = require('gulp-minify-css');    // css文件压缩
var minifyhtml = require('gulp-minify-html');    // html文件压缩
var imagemin = require('gulp-imagemin');    // 图片压缩
var pngquant = require('imagemin-pngquant');    //png图片压缩插件
var livereload = require('gulp-livereload');    // 自动刷新页面
var browserSync = require('browser-sync').create();    // 浏览器同步
//var notify = require('gulp-notify');    // 更改提醒

// js文件检查、合并、压缩
gulp.task('script', function() {
  gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter())    // 输出检查结果
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// css文件压缩
gulp.task('css', function() {
  gulp.src('src/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// hmlt文件压缩
gulp.task('html', function(){
  gulp.src('src/html/*.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest('dist/html'))
    .pipe(browserSync.stream());
});

// 图片压缩
gulp.task('images', function() {
  gulp.src('src/images/*.*')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()],    //使用pngquant来压缩png图片
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
});


// 构建
gulp.task('build', ['script', 'css', 'html', 'images']);

// 自动刷新页面
gulp.task('auto', function() {
  livereload.listen();    // 要在这里调用listen()方法
  gulp.watch('src/js/*.js', ['script']);
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/html/*.html', ['html']);
  gulp.watch('src/images/*.images', ['images']);
});

// 重载
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    startPath: ''
  });
});

// 默认执行任务
gulp.task('default', ['browser-sync', 'build', 'auto']);
