import Ember from 'ember';

export default Ember.Mixin.create({
  _renderTooltips: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      // Get jQuery object from view, find tooltip elements, and then render the tooltips
      this.$().find('.tooltip-trigger').tooltip();
    });
  }.on('didInsertElement')
});
