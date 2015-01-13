import Ember from 'ember';

export default Ember.ObjectController.extend({
  rateCounts: {},
  participationCounts: {},

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

  participationChart: {
    chartOptions: {
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    },
    dataOptions: {
      x: 'x'
    }
  },

  participationPieChart: {
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

  _getParticipationCounts: function () {
    if ( !this.get('showParticipation') ) {
      return;
    }

    var self = this,
        query = {
          _count: true,
          medicalPlan: this.get('content.id'),
          legacyClientTerminationDate: 'nexists'
        },
        _counts = {};

    var handleError = function ( err ) {
      console.error( err );
    };

    Ember.$.getJSON('/api/employees', query).then(function ( res ) {
      if ( !res || isNaN(res.count) ) {
        return handleError('Invalid server response.');
      }

      _counts.assigned = res.count;
      delete query.medicalPlan;

      return Ember.$.getJSON('/api/employees', query);
    }).then(function ( res ) {
      if ( !res || isNaN(res.count) ) {
        return handleError('Invalid server response.');
      }

      _counts.total = res.count;

      self.set('participationCounts', _counts);
    }).fail( handleError );
  }.observes('showParticipation'),

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

    var currentMonth = moment( currentDate ).date( 1 ).format('YYYY-MM-DD');

    if ( dataset[ 0 ][ dataset[ 0 ].length - 1 ] !== currentMonth ) {
      dataset[ 0 ].pushObject( currentMonth );
    }

    Ember.RSVP.all(dataset[ 0 ].map(function ( date ) {
      var jsDate = moment(date, 'YYYY-MM-DD').toDate();

      return new Ember.RSVP.Promise(function ( resolve, reject ) {
        Ember.$.getJSON('/api/employees', {
          _count: true,
          medicalPlan: self.get('content.id'),
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
          if ( !res || isNaN(res.count) ) {
            return reject('Invalid server response.');
          }

          resolve(res.count);
        }).fail( reject );
      });
    }))
    .then(function ( counts ) {
      dataset[ 1 ] = dataset[ 1 ].concat( counts );
      self.set('participationDataset', dataset);
    })
    .catch( handleError );
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

  participationPieDataset: function () {
    var participationCounts = this.get('participationCounts');

    if ( isNaN(participationCounts.total) || isNaN(participationCounts.assigned) ) {
      return;
    }

    return Ember.A([
      [ 'All Employees', participationCounts.total ],
      [ 'Assigned To Plan', participationCounts.assigned ]
    ]);
  }.property('participationCounts.assigned', 'participationCounts.total'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
