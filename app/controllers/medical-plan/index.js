import Ember from 'ember';

export default Ember.ObjectController.extend({
  rateCounts: {},
  ratesChart: {
    chartOptions: {
      color: {
        pattern: [ '#c5c5c5', '#00e075' ]
      }
    },
    dataOptions: {
      type: 'donut'
    }
  },

  _getRateCounts: function () {
    if ( !this.get('showRates') ) {
      return;
    }

    var self = this;

    var handleError = function ( err ) {
      console.error( err );
    };

    Ember.$.getJSON('/api/medical-rates', { _count: true, plan: this.get('content.id') }).then(function ( res ) {
      if ( !res || isNaN(res.count) || isNaN(res.total) ) {
        return handleError('Invalid server response.');
      }

      self.setProperties({
        rateCounts: {
          assigned: res.count,
          total:    res.total
        }
      });
    }).fail( handleError );
  }.observes('showRates'),

  _getParticipationDataset: function () {
    if ( !this.get('showParticipation') ) {
      return;
    }

    var self = this;

    var handleError = function ( err ) {
      console.error( err );
    };

    var currentDate   = moment(),
        startDate     = moment().subtract( 2, 'years' ),
        monthsBetween = Math.abs( startDate.diff( currentDate, 'months' ) ),
        timePad       = ( monthsBetween > 100 ) ? 100 : monthsBetween,
        dataset       = Ember.A([
          [ 'x' ],
          [ 'Participating Employees' ]
        ]);

    var loop = moment( startDate ).date( 1 );

    for ( var i = 0; i < timePad; i++ ) {
      if ( loop.isAfter( currentDate ) ) {
        break;
      }

      dataset[ 0 ].pushObject( loop.format('YYYY-MM-DD') );
      loop.add(Math.ceil( monthsBetween / timePad ), 'months');
    }

    Ember.RSVP.all(dataset[ 0 ].map(function ( date ) {
      var jsDate = moment(date, 'YYYY-MM-DD').toDate();

      return new Ember.RSVP.Promise(function ( resolve, reject ) {
        console.log('getting');
        Ember.$.getJSON('/api/employees', {
          _count: true,
          plan: self.get('content.id'),
          legacyClientEmploymentDate: {
            $lt: jsDate
          },
          $or: [
            {
              legacyClientTerminationDate: {
                $exists: false
              }
            },
            {
              legacyClientTerminationDate: {
                $exists: true,
                $gt: jsDate
              }
            }
          ]
        }).then(function ( res ) {
          console.log(res);
          if ( !res || isNaN(res.count) ) {
            return reject('Invalid server response.');
          }

          resolve(res.count);
        }).fail( reject );
      });
    }))
    .then(function ( counts ) {
      self.set('participationDataset', dataset[ 1 ].concat( counts ));
    })
    .catch(function ( err ) {
      console.error( err );
    });




    Ember.$.getJSON('/api/medical-rates', { _count: true, plan: this.get('content.id') }).then(function ( res ) {
      if ( !res || isNaN(res.count) || isNaN(res.total) ) {
        return handleError('Invalid server response.');
      }

      self.setProperties({
        rateCounts: {
          assigned: res.count,
          total:    res.total
        }
      });
    }).fail( handleError );
  }.observes('showParticipation'),

  ratesDataset: function () {
    var rateCounts = this.get('rateCounts');

    if ( isNaN(rateCounts.total) || isNaN(rateCounts.assigned) ) {
      return;
    }

    return Ember.A([
      [ 'All Rates', rateCounts.total ],
      [ 'Assigned To Plan', rateCounts.assigned ]
    ]);
  }.property('rateCounts.assigned', 'rateCounts.total'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
