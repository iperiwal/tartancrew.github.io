/* @file index.jade
 * @brief Navigation code and page logger for the CMURC home page.
 * @author Oscar Bezi (bezi@cmu.edu)
 * @since 18 June 2014
 */

var app = {};

// app navigation
app.nav = {};

app.nav.elems = [
    {
        className: 'home',
        btnId: 'homeBtn'
    }, 
    {
        className: 'prospective',
        btnId: 'prospectiveBtn'
    }, 
    {
        className: 'rosters',
        btnId: 'rostersBtn'
    }, 
    {
        className: 'board',
        btnId: 'boardBtn'
    }, 
    {
        className: 'alumni',
        btnId: 'alumniBtn'
    }, 
    {
        className: 'donate',
        btnId: 'donateBtn'
    }
];

app.nav.active = {};
app.nav.active.className = 'home';
app.nav.active.btnId = 'homeBtn';

app.nav.select = function (className, btnId) {
    var classes = document.getElementsByClassName(app.nav.active.className);
    for (var i = 0; i < classes.length; ++i) {
        classes[i].classList.remove('active');
    }
    document.getElementById(app.nav.active.btnId).classList.remove('active');
    app.nav.active.className = className;
    app.nav.active.btnId = btnId;
    classes = document.getElementsByClassName(app.nav.active.className);
    for (var i = 0; i < classes.length; ++i) {
        classes[i].classList.add('active');
    }
    document.getElementById(app.nav.active.btnId).classList.add('active');
}

app.nav.makeNavFn = function(btnId, className) {
        return function () {
            app.nav.select(className, btnId);
        }
}

app.nav.init = function() {
    var classes = document.getElementsByClassName(app.nav.active.className);
    for (var i = 0; i < classes.length; ++i) {
        classes[i].classList.add('active');
    }
    document.getElementById(app.nav.active.btnId).classList.add('active');

    for (var i = 0; i < app.nav.elems.length; ++i) {
        document.getElementById(app.nav.elems[i].btnId).onclick = app.nav.makeNavFn(app.nav.elems[i].btnId, app.nav.elems[i].className);
    }
}

// app initialisation
app.init = function () {
    app.nav.init();
    document.getElementById('prospective_btn').onclick = app.nav.makeNavFn('prospectiveBtn', 'prospective');
}

app.init();
