import Ember from 'ember';

export default Ember.TextField.extend({
  typeaheadOptions: {
    hint: true,
    highlight: true,
    minLength: 2
  },

  prefixData: true,
  searchObject: false,

  _setupTypeahead: function () {
    var fn = this._search.bind({ controller: this, content: this.get('searchContent') }),
        typeaheadConfig = {
          name:       this.get('name')       || 'undefined',
          displayKey: this.get('displayKey') || 'value',
          source:     fn
        },
        typeaheadOptions = this.get('typeaheadOptions');

    if( this.get('ttTemplates') ) {
      typeaheadConfig.templates = this.get('ttTemplates');
    }

    Ember.run.scheduleOnce('afterRender', this, function () {
      var $ttEl = this.get('$ttEl');

      if( $ttEl ) {
        $ttEl.typeahead('destroy');
      }

      this.set('$ttEl', this.$().typeahead(typeaheadOptions, typeaheadConfig));
    });
  }.observes('searchContent').on('didInsertElement'),

  _search: function ( query, callback ) {
    var substrRegex  = new RegExp( query, 'i' ),
        displayKey   = this.controller.get('displayKey'),
        prefixData   = this.controller.get('prefixData'),
        searchObject = this.controller.get('searchObject');

    var data = this.content ? this.content.filter(( s ) => {
      var subject = function () {
        if ( searchObject ) {
          return JSON.stringify(s);
        } else if (displayKey) {
          return s[ displayKey ];
        } else {
          return s;
        }
      };
      return substrRegex.test( subject() );
    }).map(function ( datum ) {
      if( prefixData ) {
        var o = {};

        if( displayKey ) {
          o[ displayKey ] = datum;
        } else {
          o.value = datum;
        }

        return o;
      } else {
        return datum;
      }
    }) : [];

    callback( data );
  }
});
