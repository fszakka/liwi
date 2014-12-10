!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Liwi=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var
object = require( './object' ),
Fields = require( './fields' ),
Messages = require( './messages' )

var
Field = function( props ){
	/**
	* The type of field to render
	*/
	switch( props.type ){
		/**
		* Render a TextBox Field
		*/
		case 'textbox':
			return React.createElement(Fields.TextBox, props)
			break
		/**
		* Render a TextBox Field
		*/
		case 'password':
			return React.createElement(Fields.TextBox, props)
			break
		/**
		* Render a TextBox Field
		*/
		case 'intbox':
			return React.createElement(Fields.IntegerBox, props)
			break
		/**
		* Render a TextArea Field
		*/
		case 'textarea':
			return React.createElement(Fields.TextArea, props)
			break
		/**
		* Render a Submit Field
		*/
		case 'submit':
			return React.createElement(Fields.Submit, props)
			break
		/**
		* Render a Select Field
		*/
		case 'combobox':
			return React.createElement(Fields.DropDownList, props)
			break
		/**
		* Am Blowing Up, can't believe you did nothing, jerk
		*/
		default:
			throw new Error('Have no idea what kind of field you want rendered')
	}
}

var
/**
* A Collection of HTML Field Controls to render by BaseForm
*/
RenderFields = function ( fields ) {
	// Step 1: extract keys
	var controls = Object.keys(fields)
	var renders = []
	var count = 1

	/**
	* reverse the controls order
	*/
	// TODO: that's alot of work for my computer
	controls.reverse()

	// Step 2: get controls
	while( controls.length > 0){
		// get control
		var key = controls.pop()
		var props = object.extend({}, fields[key])

		/**
		* add name to props
		*/
		props.name = key.toString() // useful for <input name='' />
		props.ref = key.toString()
		props.key = count++ // TODO: please fix me, use React key iter

		/**
		* Check for the type of field to render
		*/
		if ( (Object.keys( props ).indexOf('type') === -1) ) {
			// TODO: Please fix me
			throw new Error('Can\'t determine the type of ' + key + ' field' )
		}

		/**
		* add the control to the list of controls to render
		*/
		renders.push( Field( props ) )
	}

	return renders
}

var
BaseForm = React.createClass({displayName: 'BaseForm',

	getInitialState: function (  ) {
		return {
			fields: this.props.fields,
			data: {},
			errors: []
		}
	},
	componentDidMount: function ( ) {
	},
	extractFieldsValue: function ( ) {
		/**
		* Get the value of each field
		*/
		for( var field in this.state.fields){
			// construct data, but make sure data is valid
			if ( this.refs[field].state.isRequired ) {
				// this field's value is required, so make sure is there
				if( this.refs[field].state.value === '' ){

					this.refs[field].state.errorSpan = Messages.isRequired
					this.state.errors.push( field.toString() + ' ' + Messages.isRequired)

				}else if ( this.refs[field].state.isValid === false) {

					this.refs[field].state.errorSpan = Messages.wrongFormat
					this.state.errors.push( field.toString() + ' ' + Messages.wrongFormat)

				}else {
					// value is clean add to data
					this.state.data[field] = this.refs[field].state.value

				}
			}else if ( (this.refs[field].state.isRequired === false) &&
				(this.refs[field].state.isValid === false) ) {

					this.refs[field].state.errorSpan = Messages.wrongFormat
					this.state.errors.push( field.toString() + ' ' + Messages.wrongFormat)

				}else {
					// value is clean add to data
					this.state.data[field] = this.refs[field].state.value

				}
		}
	},
	onSubmit: function ( e ) {
		/**
		* AJAX style submit
		*/
		if ( this.props.cancel ) {
			e.preventDefault()
		}

		this.extractFieldsValue()

		var form = {
			errors: this.state.errors,
		  	data: this.state.data
		}

		/**
		* Implementers Submit
		*/
		if ( this.props.onSubmit ) {
			this.props.onSubmit( form )
		}

		// reset the errors object
		this.setState({errors: []})
	},
	render: function (  ) {
		/**
		* Loop over the Form Fields so we can
		* do some few hacks to them
		*/
		var renderFields = RenderFields( this.state.fields ).map( function ( field ) {
			// TODO: React key
			return field
		})
		/**
		* add the submit button
		*/
		renderFields.push(
			React.createElement(
				Fields.Submit, {value: this.props.value, key: 0}
			)
		)

		return React.DOM.form({className: 'liwi-baseform', onSubmit: this.onSubmit},
			renderFields
		)
	},
})

module.exports = {
	BaseForm	: BaseForm,
}

},{"./fields":2,"./messages":4,"./object":6}],2:[function(require,module,exports){
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

},{"./mixins":5}],3:[function(require,module,exports){
/* Felix Boamah <dotfelixb@gmail.com> <github.com/dotfelixb> */

'use strict';
var
base = require( './base' ),
object = require( './object' )


module.exports = {
	BaseForm	: base.BaseForm,
	Type		: object.type,
}

},{"./base":1,"./object":6}],4:[function(require,module,exports){
'use strict';

module.exports = {
	isRequired: 'field is required',
	wrongFormat: 'field is in the wrong format'
}

},{}],5:[function(require,module,exports){
'use strict';

var
Messages = require( './messages' )

var
TextBoxMixin = {
	getInitialState: function () {
		return {
			value: '',
			isRequired: this.props.required,
			isValid: true,
			errorSpan: ''
		}
	},
	validate: function ( value ) {
		if( this.state.isRequired && ( value === '') ){
			this.setState(
				{
					errorSpan: Messages.isRequired
				}
			)
		}else{
			this.setState(
				{
					value: value ,
					errorSpan: ''
				}
			)
		}
	},
	onChange: function ( e ) {
		this.validate( e.target.value )
	},
	onBlur: function ( e ) {
		this.validate( e.target.value )
	},
}

var
IntegerBoxMixin = {
	getInitialState: function () {
		return {
			value: '',
			isRequired: this.props.required,
			isValid: false,
			errorSpan: ''
		}
	},
	validate: function ( value ) {
		// eval the input if is integer only
		if ( /^([0-9])+$/.test( value ) ) {
			this.setState(
				{
					value: value,
					isValid: true,
					errorSpan: ''
				}
			)
		}else{
			this.setState(
				{
					value: value,
					isValid: false,
					errorSpan: Messages.wrongFormat
				}
			)
		}
	},
	onChange: function ( e ) {
		this.validate( e.target.value )
	},
	onBlur: function ( e ) {
		this.validate( e.target.value )
	},
}

var
TextAreaMixin = {
	getInitialState: function () {
		return {
			value: '',
			isRequired: this.props.required,
			isValid: false,
			errorSpan: ''
		}
	},
	validate: function ( value ) {
		if ( value ) {
			this.setState({ value: value })
		}
	},
	onChange: function ( e ) {
		this.validate( e.target.value )
	},
	onBlur: function ( e ) {
		this.validate( e.target.value )
	},
}

var
DropDownListMixin = {
	getInitialState: function () {
		return {
			isRequired: this.props.required,
			isValid: false,
			errorSpan: ''
		}
	},
	onChange: function ( e ) {
		this.setState({ value: e.target.value })

		if ( this.props.onChage ) {
			this.props.onChange( e )
		}
	},
}

module.exports = {
	TextBoxMixin 		: TextBoxMixin,
	IntegerBoxMixin		: IntegerBoxMixin,
	TextAreaMixin		: TextAreaMixin,
	DropDownListMixin	: DropDownListMixin
}

},{"./messages":4}],6:[function(require,module,exports){
'use strict';

// var hasOwn = Object.prototype.hasOwnProperty
var toString = Object.prototype.toString

function type( ob ) {
	return toString.call(ob).slice(8, -1).toLowerCase()
}

function extend( dest , src ) {
	for( var prop in src){
		dest[prop] = src[prop]
	}
	return dest
}

module.exports = {
	type 		: type,
	extend		: extend
}

},{}]},{},[3])(3)
});