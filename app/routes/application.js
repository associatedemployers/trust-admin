import Ember from 'ember';

const errorRouteMap = {
  401: 'unauthorized',
  404: 'not-found',
  500: 'error',
  400: 'error'
};

export default Ember.Route.extend({
  beforeModel () {
    return this.store.findAll('session').then(sessions => {
      var existingSession;

      sessions.forEach(session => {
        if ( moment(session.get('expires')).isAfter(moment()) ) {
          existingSession = session;
        } else {
          session.destroyRecord();
        }
      });

      if ( existingSession ) {
        this.session.set('content', existingSession);
      }
    });
  },

  // Define Global Action Handlers
  actions: {
    error( error ) {
      Ember.Logger.error(error);

      var route = 'error',
          err = error.errors ? error.errors[0] : error;

      if ( err && err.status ) {
        var routeInMap = errorRouteMap[ err.status ];

        if ( routeInMap ) {
          route = routeInMap;
        }
      }

      Ember.Logger.log('Routing to', route, 'to handle UX error...');

      this.controllerFor(route).set('fromError', err);
      this.transitionTo('/' + route);
    },

    showModal ( id, staticModal, forceAppend ) {
      // Assign the modal element to a variable
      var el            = $('#' + id),
          self          = this,
          previousModal = this.get('previousModal');
      // If the forceAppend variable exists, we will append it to that identifer; useful for nested view modals
      if(forceAppend) {
        // Reassign the element
        el = el.appendTo(forceAppend);
      }
      // If we are going to be rendering this as a static, non-dismissable modal, set those properties
      if(staticModal) {
        el.modal({
          keyboard: false,
          backdrop: 'static',
          show: false
        });
      }

      var showTheModal = function () {
        el.modal('show');
        self.set('previousModal', el);
      };

      if( previousModal && forceAppend ) {
        return previousModal.one('hidden.bs.modal', function () {
          showTheModal();
        });
      }

      showTheModal();
    },

    hideModal ( id ) {
      var self = this;

      $('#' + id).modal('hide').one('hidden.bs.modal', function () {
        self.set('previousModal', null);
      });
    }
  }
});
