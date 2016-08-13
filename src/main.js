$ = jQuery = require('jquery');//2 ways to set jquery with $ and var jQuery

var App = console.log('hello from browserify');

//what file browserify will export that is defined aboce in App.
module.exports = App;