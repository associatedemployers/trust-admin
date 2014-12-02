import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: [ 'tab' ],
  tab: 0,

  _tabChanged: function () {
    var tabs     = this.get('tabs'),
        tabIndex = this.get('tab');

    this.set('tabs', tabs.map(function ( tab, index ) {
      tab.active = ( index === tabIndex );
      return tab;
    }));
  }.observes('tab').on('init'),

  actions: {
    showTab: function ( index ) {
      this.set('tab', index);
    }
  }
});
