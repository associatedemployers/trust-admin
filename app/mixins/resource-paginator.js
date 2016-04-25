import Ember from 'ember';
import GrowlMixin from './growl';

export default Ember.Mixin.create(GrowlMixin, {
  /* Computed */
  pages: function () {
    return Math.ceil( this.get('maxItems') / this.get('itemsPerPage') );
  }.property('maxItems', 'itemsPerPage'),

  /* Observers */
  pageDidChange: function () {
    Ember.run.next(this, function () {
      this.set('manualPageSet', this.get('page'));
    });
  }.observes('page'),

  pagesDidChange: function () {
    // Deal with min/max
    Ember.run.once(this, this._minMaxCheck);
  }.observes('page', 'pages'),

  contentDidChange: function () {
    this.set('maxItems', this.get('content.meta.totalRecords'));
  }.observes('content'),

  shouldUpdateContent: function () {
    Ember.run.next(this, function () {
      Ember.run.once(this, this._updateContent);
    });
  }.observes('page', 'itemsPerPage', 'filters', 'sort'),

  /* Private Methods */
  _updateContent: function () {
    this.set('isLoading', true);

    var resource = this.get('modelName'),
        query    = {},
        self     = this;

    if( typeof this.get('filters') === 'object' ) {
      $.extend( query, this.get('filters') );
    }

    query.page  = this.get('page') - 1; // Zero index
    query.limit = this.get('itemsPerPage');

    console.log(query);

    this.store.query(resource, query).then(function ( data ) {
      self.setProperties({
        content: data,
        maxItems: data.get('meta.totalRecords'),
        isLoading: false
      });
    }, function ( err ) {
      console.error( err );
      self.set('isLoading', false);
      self.growlError('It looks like we are having problems talking to the server.<br /><small>' + err.statusText + '</small>');
    });
  },

  _minMaxCheck: function () {
    var p   = this.get('page'),
        max = this.get('pages');

    if( p < 1 ) {
      this.set('page', 1);
    } else if( p > max ) {
      this.set('page', max);
    }
  },

  actions: {
    jumpToPage: function ( n ) {
      this.set('page', n);
      this.send('hideModal', 'jump-to-page-modal');
    }
  }
});
