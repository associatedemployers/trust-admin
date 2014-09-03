import Ember from 'ember';

export default Ember.View.extend({
  contentDidChange: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      console.log('running');
      this.$('.trigger-popover').popover({
        html: true,
        container: 'body'
      });
    });
  }.observes('controller.content')
});
