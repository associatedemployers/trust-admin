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

    console.log(events.map(function (item) { return item.get('eventDate'); }));

    events.forEach(function ( ev ) {
      var group = dataset.find(function ( datum ) {
        return moment( datum.date ).startOf('day').isSame( moment( ev.get('eventDate') ).startOf('day') );
      });
      console.log(ev);
      var dateGroup = group || Ember.Object.create({
        date: ev.get('eventDate'),
        events: Ember.A()
      });

      console.log(dateGroup);

      dateGroup.get('events').addObject( ev );

      if( !group ) {
        dataset.addObject( dateGroup );
      }
    });

    console.log(dataset.toArray());

    return dataset;
  }.property('content.@each')
});
