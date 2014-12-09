'use strict';

var
object = require( './object' ),
Fields = require( './fields' )


var
Field = function( props ){
	switch( props.type ){
		/**
		* Render a TextBox Field
		*/
		case 'text':
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
		case 'int':
			return React.createElement(Fields.IntegerBox, props)
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

	// Step 2: get controls
	while( controls.length > 0){
		// get control
		var key = controls.pop()
		var props = object.extend({}, fields[key])

		/**
		* add name to props
		*/
		props.name = key.toString() // useful for <input name='' />
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
	/**
	* reverse the rendering order
	*/
	renders.reverse() // TODO: that's alot of work for my computer

	return renders
}

var
BaseForm = React.createClass({displayName: 'BaseForm',

	getInitialState: function (  ) {
		return {
			fields: this.props.fields
		}
	},
	componentDidMount: function ( ) {

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


		return React.DOM.form({className: 'liwi-baseform'},
			renderFields
		)
	},
})

module.exports = {
	BaseForm	: BaseForm,
}
