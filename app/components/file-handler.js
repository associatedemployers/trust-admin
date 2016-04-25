import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  numberOfFiles: computed.reads('files.length'),
  sortAscending: true,

  sortedFiles: computed('files.[]', 'sortAscending', function () {
    const asc = this.get('sortAscending'),
          files = this.get('files');

    return files && files.get('length') > 0 ? files.toArray().sort((a, b) => {
      let at = a.get('time_stamp'),
          bt = b.get('time_stamp');

      if ( at > bt ) {
        return asc ? 1 : -1;
      } else if ( at < bt ) {
        return asc ? -1 : 1;
      } else {
        return 0;
      }
    }) : files;
  }),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty( prop );
    },

    selectFile ( file ) {
      this.set('selectedFile', file);
    },

    deselectFile () {
      this.set('selectedFile', null);
    }
  }
});
