import Ember from 'ember';

export default Ember.ArrayController.extend({
  init: function () {
    console.log(this.get('content'));
  },
  dataset: function () {
    console.info('History Timeline :: Generating Dataset...');
    var historyEvents = this.get('content');

    if( !historyEvents || historyEvents.length < 1 ) {
      return Ember.A();
    }

    var data = Ember.A();

    historyEvents.forEach(function ( historyEvent, index ) {
      console.log(historyEvent);
      data.addObject({
        id:      index + 1,
        content: historyEvent.get('description'),
        start:   new Date( historyEvent.get('time_stamp') )
      });
    });

    console.info('History Timeline :: Dataset is', data);

    return data;
  }.property('content.@each')
});
