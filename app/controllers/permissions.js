import Ember from 'ember';
import Growl from '../mixins/growl';

export default Ember.ArrayController.extend(Growl, {
  httpVerbs: [ 'get', 'post', 'put', 'delete' ],
  httpTypes: [ 'resource', 'resource utility' ],
  permissionOption: Ember.Object.create(),

  httpVerbMap: {
    get: 'Read',
    post: 'Create',
    put: 'Update',
    delete: 'Delete'
  },

  _handleError: function ( err ) {
    var msg = ( err.responseText ) ? err.responseText : err.statusText;
    this.growlError( msg );
    console.error( err );
  },

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    openForm: function ( prefill ) {
      var permission = prefill || this.store.createRecord('permission-group');

      this.setProperties({
        permission:     permission,
        existingRecord: !!prefill,
        showForm:       true
      });
    },

    closeForm: function () {
      var permission = this.get('permission');

      if( !this.get('existingRecord') ) {
        permission.deleteRecord();
      } else {
        permission.rollback();
      }

      this.setProperties({
        permission: null,
        showForm:   false
      });
    },

    addEndpoint: function () {
      var endpoints = this.get('permission.endpoints'),
          input     = this.get('endpoint');

      if( !input ) {
        return;
      }

      endpoints.pushObject( input );

      this.set('endpoint', null);
    },

    removeEndpoint: function ( endpoint ) {
      var endpoints = this.get('permission.endpoints');

      endpoints.removeObject( endpoint );
    },

    addPermissionOption: function () {
      var permissions = this.get('permission.permissions'),
          input       = this.get('permissionOption');

      if( !input.type ) {
        return;
      }

      if( !input.name ) {
        input.name = this.get('httpVerbMap')[input.get('type')];
      }

      console.log(input);

      permissions.pushObject( input );

      this.set('permissionOption', Ember.Object.create());
    },

    removePermissionOption: function ( permissionOption ) {
      var permissions = this.get('permission.permissions');

      permissions.removeObject( permissionOption );
    },

    savePermission: function () {
      this.set('isSaving', true);

      var permissionGroup = this.get('permission'),
          self = this;

      if( !permissionGroup.get('name') || !permissionGroup.get('type') || permissionGroup.get('endpoints').length < 1 || permissionGroup.get('permissions').length < 1 ) {
        this.set('isSaving', false);
        return this.growlError('Please complete the form before attempting to submit.');
      }

      permissionGroup.save().then(function (/* record */) {
        self.growl('success', 'Saved', 'Successfully saved permission', 1500, 'fa fa-check');

        self.setProperties({
          isSaving: false,
          showForm: false
        });
      }).catch(function ( err ) {
        self.set('isSaving', false);
        self._handleError( err );
      });
    },

    deletePermission: function ( permission ) {
      Ember.assert('You must specify a permission to the deletePermission action', permission);

      var self = this;

      permission.destroyRecord().then(function () {
        self.growl('danger', 'Deleted', 'Successfully deleted permission', 1500, 'fa fa-check');
      }).catch(this._handleError.bind( this ));
    }
  }
});
