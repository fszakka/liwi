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

var DL = React.createClass({displayName: 'DL',

	render: function (  ) {

		return React.DOM.dl({className: 'liwi-dl'},
			this.props.children
		)
	},
})

var DT = React.createClass({displayName: 'DT',

	render: function (  ) {

		return React.DOM.dt({className: 'liwi-dt'},
			this.props.children
		)
	},
})

var DD = React.createClass({displayName: 'DLD',

	render: function (  ) {

		return React.DOM.dd({className: 'liwi-dd'},
			this.props.children
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
		var type = this.props.type === 'textbox' ? 'text' : this.props.type
		return React.createElement(DL, null,
			React.createElement(DT, null,
				React.createElement(
					Label,
					{
						label: this.props.label,
						htmlFor: this.props.name
					}
				)
			),
			React.createElement(DD, null,
				React.DOM.input(
					{
						className: 'liwi-input',
						type: type,
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

		return React.createElement(DL, null,
			React.createElement(DT, null,
				React.createElement(
					Label,
					{
						label: this.props.label,
						htmlFor: this.props.name
					}
				)
			),
			React.createElement(DD, null,
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

var
/**
* HTML <textarea ><textarea>
*/
TextArea = React.createClass({displayName: 'TextArea',

	mixins: [ mixins.TextAreaMixin],
	render: function (  ) {

		var dtStyle = {
			verticalAlign: 'top'
		}
		var taStyle = {
			maxWidth: '248px'
		}

		return React.createElement(DL, null,
			React.DOM.dt({className: 'liwi-dt', style: dtStyle},
				React.createElement(
					Label,
					{
						label: this.props.label,
						htmlFor: this.props.name
					}
				)
			),
			React.createElement(DD, null,
				React.DOM.textarea(
					{
						className: 'liwi-textarea',
						style: taStyle,
						name: this.props.name,
						id: this.props.name,
						rows: this.props.rows,
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

var
DropDownList = React.createClass({displayName: 'DropDownList',

	mixins: [mixins.DropDownListMixin],
	render: function () {

		return React.createElement(DL, null,
			React.createElement(DT, null,
				React.createElement(
					Label,
					{
						label: this.props.label,
						htmlFor: this.props.name
					}
				)
			),
			React.createElement(DD, null,
				React.DOM.select(
					{
						className: 'liwi-select',
						ref: this.props.ref,
						onChange: this.onChange
					},
					this.props.options.map(function ( option, k ) {
						return React.DOM.option(
							{
								value: option.gender,
								key: k,
								name: this.props.name
							},
							option.gender
						)
					}, this)
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
	TextArea			: TextArea,
	DropDownList		: DropDownList,
	Submit				: Submit,
}
