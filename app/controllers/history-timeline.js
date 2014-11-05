import Ember from 'ember';

export default Ember.ArrayController.extend({
  // Coalesce events
  coalescedEvents: function () {
    console.info('History Timeline :: Generating Dataset...');

    var events = this.get('content');

    if( !events ) {
      return Ember.A();
    }

    var dataset = Ember.A();

    events.forEach(function ( ev ) {
      var group = dataset.find(function ( datum ) {
        return moment( datum.date ).startOf('day').isSame( moment( ev.get('eventDate') ).startOf('day') );
      });

      var dateGroup = group || Ember.Object.create({
        date: ev.get('eventDate'),
        events: Ember.A()
      });

      dateGroup.get('events').addObject( ev );

      if( !group ) {
        dataset.addObject( dateGroup );
      }
    });

    return dataset;
  }.property('content.@each')
});
