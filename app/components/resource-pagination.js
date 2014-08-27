import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: [ 'pagination', 'resource-pagination' ],
  classNameBindings: [ 'sm:pagination-sm', 'lg:pagination-lg' ],
  renderList: [],

  init: function () {
    this._super();
    this._updateRenderList();
  },

  _updateRenderList: function () {
    /* Could do some tricks here with new Array, but for
       brevity, use an array.push & for loop method */
    var l = [],
        t = this.getProperties('pages', 'page', 'maxButtons');

    Ember.assert('You must pass a page pages value to the pagination view.', ( t.pages !== undefined && t.page !== undefined ) );

    var p = ( t.page > ( t.maxButtons / 2 ) ) ? t.page - ( t.maxButtons / 2 ) : 1;

    if( ( p + t.maxButtons ) > t.pages ) {
      p = ( t.pages - t.maxButtons ) + 1;
    }

    for (var loop = 0; loop < t.maxButtons; loop++) {
      l.push({
        n: p,
        active: ( p === t.page )
      });

      p++;
    }

    this.set('renderList', l);
  },

  shouldUpdateRenderList: function () {
    Ember.run.next(this, this._updateRenderList);
  }.observes('page', 'items'),

  onFirstPage: function () {
    return this.get('page') <= 1;
  }.property('page', 'pages'),

  onLastPage: function () {
    return this.get('page') >= this.get('pages');
  }.property('page', 'pages'),

  actions: {
    setPage: function ( n ) {
      this.set('page', n);
    },

    incrementPage: function ( inc ) {
      this.incrementProperty('page', inc);
    },

    decrementPage: function ( dec ) {
      this.decrementProperty('page', dec);
    }
  }
});
