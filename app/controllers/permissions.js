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

  showedNewForm: function () {
    if( this.get('showNewForm') === true ) {
      this.set('permission', this.store.createRecord('permission-group'));
    } else {
      this.get('permission').deleteRecord();
    }
  }.observes('showNewForm'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
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

    savePermission: function () {
      this.set('isSaving', true);

      var permissionGroup = this.get('permission'),
          self = this;

      if( !permissionGroup.get('name') || !permissionGroup.get('type') || permissionGroup.get('endpoints').length < 1 || permissionGroup.get('permissions').length < 1 ) {
        this.set('isSaving', false);
        return this.growlError('Please complete the form before attempting to submit.');
      }

      permissionGroup.save().then(function (/* record */) {
        self.growl( 'success', 'Saved', 'Successfully saved permission', 1500, 'fa fa-check');
        self.set({
          isSaving: false,
          showNewForm: false
        });
      }).catch(function ( err ) {
        var msg = ( err.responseText ) ? err.responseText : err.statusText;
        self.set('isSaving', false);
        self.growlError( msg );
        console.error( err );
      });
    }
  }
});
