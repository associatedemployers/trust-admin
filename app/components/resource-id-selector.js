import Ember from 'ember';
import SearchInput from 'trust-admin/components/search-input';

var defaults = {
  company: 'name.company'
};

export default SearchInput.extend({
  resource: null,
  prefixData: false,
  searchObject: true,
  displayKey: 'id',

  init: function () {
    this._super.apply(this, arguments);

    Ember.assert('You must define a resource to the resource-id-selector component', this.get('resource'));
    Ember.assert('You must define a valueKey to the resource-id-selector component', this.get('valueKey'));

    if( !this.get('selectComplete') ) {
      this.set('selectComplete', defaults[this.get('resource').toLowerCase()]);
    }
  },

  ttTemplates: function () {
    return {
      suggestion: Handlebars.compile('<p><strong>{{value}}</strong> <small class="text-muted">{{id}}</small></p>')
    };
  }.property('searchKey'),

  searchContent: function () {
    var self = this;

    Ember.$.getJSON('/api/' + this.get('pluralizedResource') + '/', { select: this.get('selectComplete') }).then(function ( res ) {
      var ret = res[ self.get('resource').toLowerCase() ],
          valueKey = self.get('valueKey'),
          multiLevel = valueKey.indexOf('.') > -1;

      self.set('searchContent', ret.map(function ( item ) {
        var o = {};
        o.value = ( multiLevel ) ? _getPathValue.call(item, valueKey) : item[ valueKey ];
        o.id    = item._id;
        return o;
      }));
    });
  }.property(),

  pluralizedResource: function () {
    return Ember.String.pluralize(this.get('resource').toLowerCase());
  }.property('resource')
});

function _getPathValue ( paths ) {
  paths = ( typeof paths === 'object' && paths.length ) ? paths : paths.split('.');

  var obj = this;

  var getFrom = function ( pathArray ) {
    var recursive = $.extend({}, obj ),
        ret;

    pathArray.forEach(function ( subPath ) {
      if( ret !== undefined ) {
        return;
      }
      recursive = ( recursive.hasOwnProperty( subPath ) ) ? recursive[ subPath ] : {};
    });

    var returnValue = ( ret ) ? ret : recursive;
    return ( !returnValue ) ? null : returnValue;
  };
  return getFrom( paths );
}
