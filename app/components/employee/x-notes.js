import Ember from 'ember';
import GrowlMixin from '../../mixins/growl';

const { computed } = Ember;

export default Ember.Component.extend(GrowlMixin, {
  modalTitle: computed('existingNote', function () {
    var midText = this.get('existingNote') ? 'Edit' : 'New';
    return '<h4><i class="fa fa-file-text"></i> ' + midText + ' Note</h4>';
  }),

  actions: {
    newNote () {
      this.setProperties({
        existingNote: false,
        focusNote: this.store.createRecord('note')
      });

      this.send('showModal', 'add-edit-note');
    },

    editNote ( note ) {
      this.setProperties({
        existingNote: true,
        focusNote: note
      });

      this.send('showModal', 'add-edit-note');
    },

    cancelChanges () {
      this.get('focusNote').rollback();
      this.set('focusNote', null);
    },

    removeNote ( note ) {
      let employee = this.get('parentController.content');

      if( !confirm('Are you sure you want to remove this note?') ) {
        return;
      }

      employee.get('notes').removeObject( note );

      employee.save().then(() => {
        Ember.Logger.debug('Deleted note', note.get('id'));
      }).catch(err => {
        Ember.Logger.error( err );
        this.growlError( err );
      });
    },

    saveNote () {
      let employee = this.get('parentController.content'),
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

      employee.save().then(() => {
        this.setProperties({
          loading: false,
          focusNote: null
        });

        this.send('hideModal', 'add-edit-note');
      }).catch(err => {
        Ember.Logger.error( err );
        this.growlError( err );
      });
    }
  }
});
