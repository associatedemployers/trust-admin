import Ember from 'ember';
import GrowlMixin from '../mixins/growl';
import { searchNormalizationMap } from '../utils/globals';

const { computed, observer, run, on, Inflector } = Ember;

const inflector = new Inflector(Inflector.defaultRules);

export default Ember.Controller.extend(GrowlMixin, {
  noQuery:      computed.not('query'),
  isNotStale:   computed.not('isStale'),
  disableInput: computed.or('isLoadingAutocomplete', 'isSearching', 'noQuery', 'isNotStale'),

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
      hashMunge ( data ) {
        data.name = data.name.first + ' ' + data.name.last;
        return data;
      }
    },
    company: {
      select: '_id name.company address.city address.state',
      hashMunge ( data ) {
        data.name = data.name.company;
        data.location = data.address ? data.address.city + data.address.state : null;
        return data;
      }
    },
    medicalRate: {
      autocomplete: false
    }
  },

  init () {
    this._super(...arguments);
    run.scheduleOnce('afterRender', () => {
      if ( this.get('query') ) {
        this.send('search');
      }
    });
  },

  models: computed('modelSelectMap', function () {
    var map = this.get('modelSelectMap'),
        arr = [];

    for ( var key in map ) {
      if ( !map.hasOwnProperty(key) ) {
        continue;
      }

      arr.push({
        l: key.charAt(0).toUpperCase() + key.slice(1),
        v: key
      });
    }

    return arr;
  }),

  setStale: observer('modelSelection', 'query', function () {
    this.set('isStale', true);
  }),

  shouldRefreshData: on('init', observer('modelSelection', function () {
    if ( this.get('modelSelection') ) {
      Ember.Logger.debug('Finder :: Sending refresh...');
      Ember.run.next( this, this._refreshAutocompleteData );
    }
  })),

  _refreshAutocompleteData () {
    this.set('isLoadingData', true);

    var modelSelection = this.get('modelSelection'),
        modelMap       = this.get('modelSelectMap')[ modelSelection ] || '_id';

    var query = {
      select: modelMap.select
    };

    if ( modelMap.limit ) {
      query.limit = modelMap.limit;
    }

    if ( modelMap.autocomplete === false ) {
      return this.setProperties({
        isLoadingData: false,
        autocompleteData: null
      });
    }

    Ember.$.getJSON('/api/' + inflector.pluralize(modelSelection), query)
    .then(data => {
      if ( !data || !data[modelSelection] ) {
        this.growlError('Search is unable to load data.');
        return this.set('isLoadingData', false);
      }

      let mFn = typeof modelMap.hashMunge === 'function' ? modelMap.hashMunge : Ember.K(),
          hashes = data[modelSelection].map(mFn);

      this.setProperties({
        isLoadingData:    false,
        autocompleteData: hashes
      });
    })
    .catch(err => {
      this.growlError(err);
      Ember.Logger.error(err);
    });
  },

  typeaheadOptions: {
    hint: true,
    highlight: true,
    minLength: 3
  },

  _setupTypeahead: observer('autocompleteData.[]', function () {
    var fn = this._search.bind( this.get('controller.autocompleteData') );
    var typeaheadConfig = {
      name: this.get('controller.modelSelection'),
      displayKey: 'name',
      source: fn
    };
    var typeaheadOptions = this.get('typeaheadOptions');

    run.scheduleOnce('afterRender', () => {
      var $ttEl = this.get('$ttEl');

      if( $ttEl ) {
        $ttEl.typeahead('destroy');
      }

      this.set('$ttEl', Ember.$('input.typeahead').typeahead(typeaheadOptions, typeaheadConfig));
    });
  }),

  _search ( query, callback ) {
    var data = this ? this.filter(o => {
      let json = JSON.stringify(o),
          matched = true;

      query.split(' ').forEach(word => {
        var substrRegex = new RegExp(word, 'i');

        if( !substrRegex.test( json ) ) {
          matched = false;
        }
      });

      return matched;
    }) : [];

    callback(data);
  },

  checkShouldTriggerHelp: observer('query', 'isStale', function () {
    Ember.run.scheduleOnce('afterRender', () => {
      if ( this.get('query') && this.get('isStale') && !this.get('triggeredHelp') ) {
        this.set('triggeredHelp', true);
        Ember.$('.help-trigger').tooltip({
          placement: 'bottom',
          trigger: 'manual'
        }).tooltip('show');
      } else if( !this.get('isStale') ) {
        Ember.$('.help-trigger').tooltip('hide');
      }
    });
  }),

  actions: {
    search () {
      var model  = this.get('modelSelection'),
          models = this.get('models');

      this.set('isSearching', true);

      var query = {
        models:    model ? [ model ] : models.map(m => m.v),
        limit:     this.get('limit'),
        query:     this.get('query'),
        normalize: searchNormalizationMap
      };

      Ember.Logger.debug(query);

      var startTime = moment();

      Ember.RSVP.Promise.resolve(Ember.$.getJSON('/api/search', query))
      .then(results => {
        this.setProperties({
          content:    results,
          isStale:    false,
          resultTime: (moment().diff(startTime) / 1000).toFixed(3)
        });
      })
      .catch(err => {
        this.growlError(err);
        Ember.Logger.error(err);
      })
      .finally(() => {
        this.set('isSearching', false);
      });
    }
  }
});
