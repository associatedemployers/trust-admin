import Ember from 'ember';
import GrowlMixin from './growl';

export default Ember.Mixin.create(GrowlMixin, {
  /* Computed */
  pages: function () {
    return Math.ceil( this.get('maxItems') / this.get('itemsPerPage') );
  }.property('maxItems', 'itemsPerPage'),

  /* Observers */
  pageDidChange: function () {
    // Deal with min/max
    Ember.run.once(this, this._minMaxCheck);
  }.observes('page', 'pages'),

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

    query.page  = this.get('page') - 1; // Zero index
    query.limit = this.get('itemsPerPage');

    console.log(query);

    this.store.find(resource, query).then(function ( data ) {
      self.setProperties({
        content: data,
        isLoading: false
      });
    }, function ( err ) {
      console.error( err );

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
  }
});
