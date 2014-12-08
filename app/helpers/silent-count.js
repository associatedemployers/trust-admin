import Ember from 'ember';

function silentCount ( context, arrayPath ) {
  var fetchedArray = ( context && context._data ) ? context._data[ arrayPath ] : [];

  return ( fetchedArray ) ? fetchedArray.length : 0;
}

export {
  silentCount
};

export default Ember.Handlebars.makeBoundHelper( silentCount );
