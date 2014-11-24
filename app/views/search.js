import Ember from 'ember';

export default Ember.View.extend({
  classNames: [ 'search-view' ],

  typeaheadOptions: {
    hint: true,
    highlight: true,
    minLength: 3
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
    var data = ( this ) ? this.filter(function ( o ) {
      var json = JSON.stringify( o ),
          matched = true;

      query.split(' ').forEach(function ( word ) {
        var substrRegex = new RegExp( word, 'i' );

        if( !substrRegex.test( json ) ) {
          matched = false;
        }
      });

      return matched;
    }) : [];

    callback( data );
  },

  checkShouldTriggerHelp: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      if( this.get('controller.query') && this.get('controller.isStale') && !this.get('triggeredHelp') ) {
        this.set('triggeredHelp', true);
        this.$().find('.help-trigger').tooltip({
          placement: 'bottom',
          trigger: 'manual'
        }).tooltip('show');
      } else if( !this.get('controller.isStale') ) {
        this.$().find('.help-trigger').tooltip('hide');
      }
    });
  }.observes('controller.query', 'controller.isStale'),
});
