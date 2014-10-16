import Ember from 'ember';

export default Ember.View.extend({
  contentDidChange: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.trigger-popover').popover({
        html: true,
        container: 'body'
      });
    });
  }.observes('controller.content')
});
