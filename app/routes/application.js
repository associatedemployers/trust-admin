import Ember from 'ember';

export default Ember.Route.extend({
  // Define Global Action Handlers
  actions: {
    error ( err, transition ) {
      Ember.Logger.error( err );

      var session       = this.session,
          authenticated = session.get('authenticated'),
          isExpired     = authenticated ? moment( session.get('content.expires') ).isBefore( moment() ) : undefined;

      if( err.status === 401 ) {
        if( authenticated && !isExpired ) {
          return this.transitionTo('error', err);
        }

        this.controllerFor('login').setProperties({
          savedTransition: transition,
          expiredSession:  isExpired
        });

        this.session.logout();

        this.transitionTo('login');
      } else {
        this.transitionTo('error', err);
      }
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
