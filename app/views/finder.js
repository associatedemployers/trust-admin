import Ember from 'ember';

export default Ember.View.extend({
  classNames: [ 'finder' ],

  typeaheadOptions: {
    hint: true,
    highlight: true,
    minLength: 1
  },

  _setupTypeahead: function () {
    var fn = this._search.bind( this.get('controller.autocompleteData') );
    var typeaheadConfig = {
      name: this.get('controller.modelSelection'),
      displayKey: 'name',
      source: fn
    };
    var typeaheadOptions = this.get('typeaheadOptions');

    Ember.run.scheduleOnce('afterRender', this, function () {
      var $ttEl = this.get('$ttEl');

      if( $ttEl ) {
        $ttEl.typeahead('destroy');
      }

      this.set('$ttEl', this.$('input.typeahead').typeahead(typeaheadOptions, typeaheadConfig));
    });
  }.observes('controller.autocompleteData.@each'),

  _search: function ( query, callback ) {
    var matches = [],
        substrRegex = new RegExp( query, 'i' );

    this.forEach(function ( o ) {
      if( substrRegex.test( JSON.stringify( o ) ) ) {
        matches.push( o );
      }
    });
 
    callback( matches );
  }
});
