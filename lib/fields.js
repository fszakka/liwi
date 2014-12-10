'use strict';

var
mixins = require( './mixins' )


var
ErrorSpan = React.createClass({displayName: 'ErrorSpan',

	render: function ( ) {
		var spanLength = this.props.errorSpan.length

		var style = {
			color: spanLength > 0 ? '#f00' : '#000',
			fontWeight: spanLength > 0 ? 'bold' : 'normale'
		}
		return React.DOM.span(
			{
				className: 'liwi-errorspan',
				style: style
			},
			this.props.errorSpan
		)
	},
})
var
/**
* HTML <label ></label>
*/
Label = React.createClass({displayName: 'Label',

	render: function ( ) {

		return React.DOM.label(
			{
				className: 'liwi-label',
				htmlFor: this.props.htmlFor
			},
			this.props.label
		)
	},
})

var
/**
* HTML <input type='text|password' />
*/
TextBox = React.createClass({displayName: 'TextBox',

	mixins: [ mixins.TextBoxMixin ],
	componentDidMount: function () {
	},
	render: function ( ) {

		return React.DOM.dl({className: 'liwi-dl'},
			React.DOM.dt({className: 'liwi-dt'},
				React.createElement(
					Label,
					{
						label: this.props.label,
						htmlFor: this.props.name
					}
				)
			),
			React.DOM.dd({className: 'liwi-dd'},
				React.DOM.input(
					{
						className: 'liwi-input',
						type: this.props.type,
						name: this.props.name,
						id: this.props.name,
						ref: this.props.ref,
						onChange: this.onChange,
						onBlur: this.onChange
					}
				),
				React.createElement(
					ErrorSpan,
					{errorSpan: this.state.errorSpan}
				)
			)
		)
	},

})

var
/**
* HTML <input type="text" />
*/
IntegerBox = React.createClass({displayName: 'IntegerBox',

	mixins: [ mixins.IntegerBoxMixin ],
	render: function (  ) {

		return React.DOM.dl({className: 'liwi-dl'},
			React.DOM.dt({className: 'liwi-dt'},
				React.createElement(
					Label,
					{
						label: this.props.label,
						htmlFor: this.props.name
					}
				)
			),
			React.DOM.dd({className: 'liwi-dd'},
				React.DOM.input(
					{
						className: 'liwi-input',
						type: 'text',
						name: this.props.name,
						id: this.props.name,
						ref: this.props.ref,
						onChange: this.onChange,
						onBlur: this.onBlur,
					}
				),
				React.createElement(
					ErrorSpan,
					{errorSpan: this.state.errorSpan}
				)
			)
		)
	},
})

// TODO: HTML <input type='password' />

var
Submit = React.createClass({displayName: 'Submit',

	render: function (  ) {

		return React.DOM.input(
			{
				className: 'liwi-submit',
				type: 'submit',
				value: this.props.value
			}
		)
	},
})

module.exports = {
	TextBox				: TextBox,
	IntegerBox			: IntegerBox,
	Submit				: Submit
}
