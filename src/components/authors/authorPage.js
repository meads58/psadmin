"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');//calls child component

var Authors = React.createClass({
	//getting the author data from outside react and bringing it in.
	getInitialState: function() {
		return {
			authors: []
		};
	},

	componentDidMount: function() {
		if (this.isMounted()) {
			this.setState({ authors: AuthorApi.getAllAuthors() });
		}
	},

	render: function() {
		return (
			//passes the state to the AuthorList prop
			<div>
				<h1>Authors</h1>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = Authors;