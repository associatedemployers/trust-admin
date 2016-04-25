import Ember from 'ember';

function shortenText ( [value, length] ) {
  return value.substr(0, length - 3) + '...';
}

export {
  shortenText
};

export default Ember.Helper.helper(shortenText);
