import Ember from 'ember';

const { set } = Ember;

export default Ember.Mixin.create({
  queryParams: [ 'tab' ],
  tab: 0,

  _tabChanged: function () {
    var tabs     = this.get('tabs'),
        tabIndex = this.get('tab');

    this.set('tabs', tabs.map((tab, i) => {
      set(tab, 'active', i === tabIndex);
      return tab;
    }));
  }.observes('tab').on('init'),

  actions: {
    showTab ( index ) {
      this.set('tab', index);
    }
  }
});
