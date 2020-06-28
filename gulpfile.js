const gulp=require('gulp');
const sass=require('gulp-sass');
const connect=require('gulp-connect');
// const { series } = require('gulp');
// const concat=require('gulp-concat');
// const uglify=require('gulp-uglify');
// const babel = require("gulp-babel");
//拷贝一个文件到指定文件夹下
gulp.task('copyFiles',(done)=>{
    gulp.src('./src/pages/*.html')
    .pipe(gulp.dest('dist/pages'))
    .pipe(connect.reload());
    gulp.src('./src/js/*.js').pipe(gulp.dest('dist/js')).pipe(connect.reload());
    gulp.src('./src/css/*.css').pipe(gulp.dest('dist/css')).pipe(connect.reload());
    done();
});
//拷贝图片到指定文件夹下
gulp.task('copyImg',(done)=>{
    gulp.src('./src/image/*.{jpg,png}').pipe(gulp.dest('dist/image'));//*.{jpg,png}
    done();
});
//拷贝文件夹下全部文件
// gulp.task('copyfile',done=>{
//     gulp.src('./old/image/**/*').pipe(gulp.dest('./dist/image'));
//     done();//  /* :该文件夹下全部文件及文件夹但不包括文件夹下文件  /**/*：包括文件夹文件
// });
// //将两个文件夹下的文件拷贝到一个文件夹下面
// gulp.task('copyfiles',done=>{
//     gulp.src(["./aaa/a.js","./bbb/b.js"]).pipe(gulp.dest("./dest/com"))
//     done();
// });
// //排除文件拷贝
// gulp.task('delfile',done=>{
//     gulp.src(['./aaa/*.js','bbb/*.js','!aaa/aa.js']).pipe(gulp.dest('./des/com1'))
//     done();
// });
//监听文件
gulp.task('watch',done=>{
    gulp.watch('./src/pages/*.html',gulp.series('copyFiles'));
    gulp.watch('./src/css/*.css',gulp.series('copyFiles'));
    gulp.watch('./src/js/*.js',gulp.series('copyFiles'));
    gulp.watch("./src/image/*.{jpg,png}",gulp.series("copyImg"));
    done();
});
//将sass文件转化成css文件
// gulp.task('sass',done=>{
//     gulp.src('./sass/test.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./dist/css'));
//     done();
// });
//搭建本地服务器
gulp.task('server',done=>{
    connect.server({
        root:'dist',
        livereload:true
    });
    done();
})

//合并两个文件到一个文件
// gulp.task('concat',done=>{
//     gulp.src(['./aaa/a.js','./bbb/b.js']).pipe(concat('add.js')).pipe(gulp.dest('./dist/com'));
//     done();
// });
// gulp.task('uglify',done=>{
//     gulp.src(['./aaa/a.js','./bbb/b.js']).pipe(concat('add.js')).pipe(uglify()).pipe(gulp.dest('./dist/com'));
//     done();
// });
// gulp.task("babel",function(done){
//     gulp.src("json/a.js")
//     .pipe(babel({presets: ["@babel/preset-env"]}))
//     .pipe(gulp.dest("dist/lib"));
//     done();
// });
gulp.task('default',gulp.series('watch','server'));


