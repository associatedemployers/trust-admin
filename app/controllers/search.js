import Ember from 'ember';
import GrowlMixin from '../mixins/growl';

export default Ember.ArrayController.extend(GrowlMixin, {
  queryParams: {
    modelSelection: 'type',
    query: 'query'
  },

  modelSelection: null,
  query:          null,
  limit: 100,

  modelSelectMap: {
    employee: {
      limit: 4000,
      select: '_id name.first name.last',
      hashMunge: function ( data ) {
        data.name = data.name.first + ' ' + data.name.last;
        return data;
      }
    },
    company: {
      select: '_id name.company address.city address.state',
      hashMunge: function ( data ) {
        data.name = data.name.company;
        data.location = ( data.address ) ? data.address.city + data.address.state : null;
        return data;
      }
    }
  },

  models: function () {
    var map = this.get('modelSelectMap'),
        arr = [];

    for ( var key in map ) {
      arr.push({
        l: key.charAt(0).toUpperCase() + key.slice(1),
        v: key
      });
    }

    return arr;
  }.property('modelSelectMap'),

  disableInput: function () {
    return ( this.get('isLoadingAutocomplete') || this.get('isSearching') );
  }.property('isLoadingAutocomplete', 'isSearching'),

  shouldRefreshData: function () {
    if( this.get('modelSelection') ) {
      console.debug('Finder :: Sending refresh...');
      Ember.run.next( this, this._refreshAutocompleteData );
    }
  }.observes('modelSelection').on('init'),

  _refreshAutocompleteData: function () {
    var self = this;
    console.debug('Finder :: Loading data...');
    this.set('isLoadingData', true);

    var modelSelection = this.get('modelSelection'),
        modelMap       = this.get('modelSelectMap')[ modelSelection ] || '_id';

    var query = {
      select: modelMap.select
    };

    if( modelMap.limit ) {
      query.limit = modelMap.limit;
    }

    Ember.$.getJSON('/api/' + Ember.Inflector.inflector.pluralize( modelSelection ), query).then(function ( data ) {
      if( !data || !data[ modelSelection ] ) {
        self.growlError('Finder is unable to load data.');
        return self.set('isLoadingData', false);
      }

      var mFn = ( typeof modelMap.hashMunge === 'function' ) ? modelMap.hashMunge : Ember.K();

      var hashes = data[ modelSelection ].map( mFn );

      self.setProperties({
        isLoadingData:    false,
        autocompleteData: hashes
      });

    }, function ( err ) {

      self.growlError( err );
      console.error( err );

    });
  },

  actions: {
    /*search: function () {
      var self = this,
          model = this.get('modelSelection'),
          models = this.get('models'),
          modelUrl = ( model ) ? Ember.Inflector.inflector.pluralize( model ) + '/' : '';

      this.setProperties('isSearching', true);

      var getData = {
        models: ( model ) ? model : models,
        limit: this.get('limit')
      };

      Ember.$.getJSON('/api/' + modelUrl + 'deep-search', getData, function ( results ) {

      }, function ( err ) {
        self.
      });
    }*/
  }
});
