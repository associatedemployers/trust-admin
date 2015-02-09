import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function () {
    NProgress.start();

    this._super.apply(this, arguments);
  },

  afterModel: function () {
    NProgress.inc();
    
    Ember.run.scheduleOnce('afterRender', this, function () {
      NProgress.done();
    });

    this._super.apply(this, arguments);
  }
});
