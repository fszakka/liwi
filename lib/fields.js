'use strict';


var
Label = React.createClass({displayName: 'Label',

	render: function ( ) {

		return React.DOM.label({htmlFor: this.props.htmlFor}, this.props.label)
	},
})

var
/**
* HTML <input type='text|password' />
*/
TextBox = React.createClass({displayName: 'TextBox',

	componentDidMount: function () {
	},
	render: function ( ) {
		if ( this.props.label ) {
			return React.DOM.dl(null,
				React.DOM.dt(null,
					React.createElement(
						Label,
						{
							label: this.props.label,
							htmlFor: this.props.name
						}
					)
				),
				React.DOM.dd(null,
					React.DOM.input(
						{
							type: this.props.type,
							name: this.props.name,
							id: this.props.name
						}
					)
				)
			)
		}else {
			return React.DOM.input(
				{
					type: this.props.type
				}
			)
		}
	},

})

var
/***/
IntegerBox = React.createClass({displayName: 'IntegerBox',

	onChange: function ( e ) {
		// eval the input if is integer only
		if ( /^([0-9])+$/.test( e.target.value ) ) {
			console.log( 'match' )
		}else{
			console.error( 'don\'t match' )
		}
	},
	render: function (  ) {
		if ( this.props.label ) {
			return React.DOM.dl(null,
				React.DOM.dt(null,
					React.createElement(
						Label,
						{
							label: this.props.label,
							htmlFor: this.props.name
						}
					)
				),
				React.DOM.dd(null,
					React.DOM.input(
						{
							type: 'text',
							name: this.props.name,
							id: this.props.name,
							onChange: this.onChange
						}
					)
				)
			)
		}else {
			return React.DOM.input(
				{
					type: 'text',
					onChange: this.onChange
				}
			)
		}

	},
})

// TODO: HTML <input type='password' />

module.exports = {
	TextBox				: TextBox,
	IntegerBox			: IntegerBox,
}
