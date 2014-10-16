import Ember from 'ember';

function pluralizeText ( value ) {
  return Ember.Inflector.inflector.pluralize( value );
}

export {
  pluralizeText
};

export default Ember.Handlebars.makeBoundHelper(pluralizeText);
