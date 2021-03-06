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
	BaseForm	: BaseForm
}
