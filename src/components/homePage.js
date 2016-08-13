"use strict";

//common js pattern
var React = require('react');

var Home = React.createClass({//allows us to create a class that contains our component
	render: function() {//render is where we put our JSX and what it returns is what will be returned to the screen
		return (
			<div className="jumbotron">
				<h1>Pluralsight Administration</h1>
				<p>React, React Router and Flux</p>
			</div>
		);
	}
});

module.exports = Home;