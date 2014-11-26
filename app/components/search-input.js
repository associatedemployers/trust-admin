import Ember from 'ember';

export default Ember.TextField.extend({
  typeaheadOptions: {
    hint: true,
    highlight: true,
    minLength: 2
  },

  _setupTypeahead: function () {
    var fn = this._search.bind( this.get('searchContent') ),
        typeaheadConfig = {
          name:       this.get('name')       || 'undefined',
          displayKey: this.get('displayKey') || 'value',
          source:     fn
        },
        typeaheadOptions = this.get('typeaheadOptions');

    Ember.run.scheduleOnce('afterRender', this, function () {
      var $ttEl = this.get('$ttEl');

      if( $ttEl ) {
        $ttEl.typeahead('destroy');
      }

      this.set('$ttEl', this.$().typeahead(typeaheadOptions, typeaheadConfig));
    });
  }.observes('controller.searchContent.@each').on('didInsertElement'),

  _search: function ( query, callback ) {
    var substrRegex = new RegExp( query, 'i' ),
        displayKey  = this.get('displayKey');

    var data = ( this ) ? this.filter(function ( s ) {
      var subject = ( displayKey ) ? s[ displayKey ] : s;

      return substrRegex.test( subject );
    }).map(function ( datum ) {
      var o = {};

      if( displayKey ) {
        o[ displayKey ] = datum;
      } else {
        o.value = datum;
      }

      return o;
    }) : [];

    callback( data );
  },
});
