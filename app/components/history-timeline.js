import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: [ 'history-timeline-view' ],

  // Coalesce events
  coalescedEvents: computed('events.[]', function () {
    Ember.Logger.info('History Timeline :: Generating Dataset...');

    var events = this.get('events');

    if( !events ) {
      return Ember.A();
    }

    var dataset = Ember.A();

    events.forEach(ev => {
      var group = dataset.find(datum => moment(datum.date).startOf('day').isSame(moment(ev.get('eventDate')).startOf('day')));

      var dateGroup = group || Ember.Object.create({
        date: ev.get('eventDate'),
        events: Ember.A()
      });

      dateGroup.get('events').addObject(ev);

      if ( !group ) {
        dataset.addObject(dateGroup);
      }
    });

    return dataset;
  }),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty( prop );
    },

    selectEvent ( historyEvent ) {
      this.set('selectedEvent', historyEvent);
    }
  }
});
