import Ember from 'ember';

function shortenText ( value, length ) {
  return value.substr(0, length - 2) + '...';
}

export {
  shortenText
};

export default Ember.Handlebars.makeBoundHelper(shortenText);
