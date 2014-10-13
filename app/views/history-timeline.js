import Ember from 'ember';

export default Ember.View.extend({
  classNames: [ 'timeline', 'timeline-history-events' ],

  _draw: function () {
    console.info('History Timeline :: Drawing...');
    Ember.run.next(this, function () {
      var timeline   = this.get('timeline'),
          visDataSet = new vis.DataSet( this.get('controller.dataset') );

      if( !visDataSet ) {
        return;
      }

      var options = {

      };

      if( timeline ) {
        timeline.setItems( visDataSet );
      } else {
        timeline = new vis.Timeline( this.$()[0], visDataSet, options );

        this.set('timeline', timeline);
      }
    });
  }.observes('controller.dataset')
});
