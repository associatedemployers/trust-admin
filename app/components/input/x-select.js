// app/components/my-select.js
// from http://jsbin.com/fotuqa
import Ember from 'ember';

export default Ember.Component.extend({
  content: null,
  prompt: null,
  optionValuePath: null,
  optionLabelPath: null,
  action: Ember.K, // action to fire on change
  compareSelectionWithValue: false,
  selectClass: 'form-control',

  // shadow the passed-in `selection` to avoid
  // leaking changes to it via a 2-way binding
  _selection: Ember.computed.reads('selection'),

  _initComponent: function () {
    if (!this.get('content')) {
      this.set('content', []);
    }
  }.on('init'),

  actions: {
    change() {
      const selectEl = this.$('select')[0];
      const selectedIndex = selectEl.selectedIndex;
      const content = this.get('content');

      // decrement index by 1 if we have a prompt
      const hasPrompt = !!this.get('prompt');
      const contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;

      const optionValuePath = this.get('optionValuePath');
      const selection = content.objectAt ? content.objectAt(contentIndex) : content[contentIndex];

      // set the local, shadowed selection to avoid leaking
      // changes to `selection` out via 2-way binding
      this.set('_selection', selection);

      const changeCallback = this.get('action');
      const arg = optionValuePath && selection ? Ember.get(selection, optionValuePath) : selection;

      changeCallback(arg);
    }
  }
});
