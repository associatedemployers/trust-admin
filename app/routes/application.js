import Ember from 'ember';

export default Ember.Route.extend({

  // Define Global Action Handlers
  actions: {
    showModal: function (id, staticModal, forceAppend) {
      // Assign the modal element to a variable
      var el            = $("#" + id),
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

      if( previousModal && staticModal ) {
        return previousModal.one('hidden.bs.modal', function () {
          showTheModal();
        });
      }

      showTheModal();
    },

    hideModal: function (id) {
      var self = this;

      $('#' + id).modal('hide').one('hidden.bs.modal', function () {
        self.set('previousModal', null);
      });
    }
  }
});
