//our entry point for the application
$ = jQuery = require('jquery');//2 ways to set jquery with $ and var jQuery
var React = require('react');
var Home = require('./components/homePage');
var Authors = require('./components/authors/authorPage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');

//an iffe to allow use strict to be used and pass the linter.
//iffe is an immiately invoked function expression
(function(win) {
	"use strict";
	var App = React.createClass({
		render: function() {
			var Child; //what child we want to render, home or about
			
			switch(this.props.route) {
				case 'about': Child = About; break;
				case 'authors': Child = Authors; break;
				default: Child = Home;
			}
			return (// will look at the route and either load the home or about component
				<div>
					<Header/>
					<Child/>
				</div>
			);
		}
	});

	//simple way to do routing. Don't use in production use the Router instead.
	function render() {
		var route = win.location.hash.substr(1);//gets the route by taking a piece of the url
		//Created an abstraction that sites above the Homepage.
		//pass the route property to the App function which runs the switch
		//and returns the page to render at the app id.
		React.render(<App route={route} />, document.getElementById('app'));
	}

	//listens for a hashchange in the url. It will call the render function above
	win.addEventListener('hashchange', render);
	render();
	//takes the componenet we want to render and the dom element we want to attach to.
	//Go take our home compnenet and attach it to the app id element
	//React.render(<Home />, document.getElementById('app'));
}(window));

