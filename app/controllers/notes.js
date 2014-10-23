import Ember from 'ember';
import GrowlMixin from '../mixins/growl';

export default Ember.ArrayController.extend(GrowlMixin, {
  modalTitle: function () {
    var midText = ( this.get('existingNote') ) ? 'Edit' : 'New';

    return '<h4><i class="fa fa-file-text"></i> ' + midText + ' Note</h4>';
  }.property('existingNote'),

  actions: {
    newNote: function () {
      this.setProperties({
        existingNote: false,
        focusNote: this.store.createRecord('note')
      });

      this.send('showModal', 'add-edit-note');
    },

    editNote: function ( note ) {
      this.setProperties({
        existingNote: true,
        focusNote: note
      });

      this.send('showModal', 'add-edit-note');
    },

    cancelChanges: function () {
      this.get('focusNote').rollback();
      this.set('focusNote', null);
    },

    removeNote: function ( note ) {
      var self     = this,
          employee = this.get('parentController.content');
      
      if( !confirm('Are you sure you want to remove this note?') ) {
        return;
      }

      employee.get('notes').removeObject( note );

      employee.save(function ( /* record */ ) {
        console.log('Deleted note', note.get('id'));
      }, function ( err ) {
        console.error( err );
        self.growlError( err );
      });
    },

    saveNote: function () {
      var self     = this,
          employee = this.get('parentController.content'),
          note     = this.get('focusNote');

      this.set('loading', true);

      if( !note.get('text') ) {
        this.growl('warning', 'Problem saving note', 'Please enter some text...', 5000);
        return this.set('loading', false);
      }

      if( note.get('ebms') ) {
        note.set('concat', true);
      }

      employee.get('notes').addObject( note );

      employee.save(function ( /* record */ ) {
        self.setProperties({
          loading: false,
          focusNote: null
        });

        self.send('hideModal', 'add-edit-note');
      }, function ( err ) {
        console.error( err );
        self.growlError( err );
      });
    }
  }
});
