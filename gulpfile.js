let gulp = require("gulp");
let rename = require("gulp-rename");
let uglify = require('gulp-uglify-es').default;
gulp.task("uglify", function () {
    return gulp.src("assets/qvyapps.js")
        .pipe(rename("bundle.min.js"))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("assets/"));
});
