import Ember from 'ember';
import GrowlMixin from '../mixins/growl';
import { searchNormalizationMap } from '../utils/globals';

export default Ember.ArrayController.extend(GrowlMixin, {
  noQuery: Ember.computed.not('query'),
  isNotStale: Ember.computed.not('isStale'),
  disableInput: Ember.computed.or('isLoadingAutocomplete', 'isSearching', 'noQuery', 'isNotStale'),

  queryParams: {
    modelSelection: 'type',
    query: 'query'
  },

  modelSelection: null,
  query:          '',
  limit:          100,
  isStale:        true,

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

  init: function () {
    this._super.apply(this, arguments);

    Ember.run.scheduleOnce('afterRender', this, function () {
      if( this.get('query') ) {
        this.send('search');
      }
    });
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

  setStale: function () {
    this.set('isStale', true);
  }.observes('modelSelection', 'query'),

  shouldRefreshData: function () {
    if( this.get('modelSelection') ) {
      console.debug('Finder :: Sending refresh...');
      Ember.run.next( this, this._refreshAutocompleteData );
    }
  }.observes('modelSelection').on('init'),

  _refreshAutocompleteData: function () {
    var self = this;

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
    search: function () {
      var self   = this,
          model  = this.get('modelSelection'),
          models = this.get('models');

      this.set('isSearching', true);

      var query = {
        models:    ( model ) ? [ model ] : models.map(function ( m ) { return m.v; }),
        limit:     this.get('limit'),
        query:     this.get('query'),
        normalize: searchNormalizationMap
      };

      console.log(query);

      var startTime = moment();

      Ember.RSVP.Promise.resolve(Ember.$.getJSON('/api/search', query))
      .then(function ( results ) {
        self.setProperties({
          content:    results,
          isStale:    false,
          resultTime: (moment().diff(startTime) / 1000).toFixed(3)
        });
      })
      .catch(function ( err ) {
        self.growlError( err );
        console.error( err );
      })
      .finally(function () {
        self.set('isSearching', false);
      });
    }
  }
});
