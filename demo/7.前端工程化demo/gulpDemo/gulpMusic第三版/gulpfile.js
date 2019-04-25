var gulp = require('gulp');
// 插件
var htmlClean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var debug = require('gulp-strip-debug');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var postCss = require('gulp-postcss');
var autoprefixer = require("autoprefixer");
var connect = require('gulp-connect');//开启本地服务器


var folder = {
    src: 'src/',
    dist: 'dist/'
}
// 设置环境变量 export NODE_ENV=development
var devMode = process.env.NODE_ENV == 'development';
// console.log(devMode);//true

gulp.task('html',function(){
    var page = gulp.src(folder.src + 'html/*')
                .pipe(connect.reload())
                if(!devMode){
                   page.pipe(htmlClean())
                }
                page.pipe(gulp.dest(folder.dist + 'html/'));
})
 
gulp.task('css',function(){
    var page = gulp.src(folder.src + 'css/*')
                .pipe(connect.reload())
                .pipe(less())
                .pipe(postCss([autoprefixer()]))
                if(!devMode){
                    page.pipe(cleanCss())
                }       
                page.pipe(gulp.dest(folder.dist + 'css/'));
})

gulp.task('js',function(){
    var page = gulp.src(folder.src + 'js/*')
                .pipe(connect.reload())
                if(!devMode){
                   page.pipe(debug())
                //    page.pipe(uglify())
                }
                page.pipe(gulp.dest(folder.dist + 'js/'));
})

gulp.task('image',function(){
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'));
})

gulp.task('server',function(){
    connect.server({
        port: 8888,
        livereload: true
    });
});

gulp.task('watch',function(){
    gulp.watch(folder.src + 'html/*',['html']);//监听src/html只要变化了，便触发html任务
    gulp.watch(folder.src + 'css/*',['css']);
    gulp.watch(folder.src + 'js/*',['js']);
})


gulp.task('default',['html','css','js','image','server','watch'])