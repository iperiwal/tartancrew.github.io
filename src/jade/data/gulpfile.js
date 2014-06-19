/**
 * @file gulpfile.js
 * @brief Builds a data.json object from the other .json files in the directory.
 * @author Oscar Bezi (bezi@cmu.edu)
 * @since 17 July 2014
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');
var board_members = require('./board_members');
var current_novices = require('./current_novices');
var current_varsity = require('./current_varsity');
var graduates = require('./graduates');


function getYear(string) {
    switch(string) {
        case "Freshman": return 1;
        case "Sophomore": return 2;
        case "Junior": return 3;
        case "Senior": return 4;
        case "Graduate Student": return 5;
    }
}

// @brief sorts the lists
function sorting(a, b) {
    var aYr = getYear(a.year),
        bYr = getYear(b.year);
    if (aYr === bYr) { // sort by last names
        var aLastName = a.name.split(' ').slice(1).join(' ')
            bLastName = b.name.split(' ').slice(1).join(' ');

        if (aLastName < bLastName) {
            return -1;
        } else if (bLastName < aLastName) {
            return 1;
        } else {
            return 0;
        }
        
    } else {
        return bYr - aYr
    }
}

gulp.task('build', function() {
    var data = {};
    data.board_members = board_members;
    data.current_novices = current_novices;
    data.current_novices.sort(sorting);
    data.current_varsity = current_varsity;
    data.current_varsity.sort(sorting);
    data.graduates = graduates;
    data.graduates.sort(sorting);
    fs.writeFile('data.json', JSON.stringify(data));
});

gulp.task('default', ['build']);
