import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'option',
  attributeBindings: ['value', 'selected'],

  selected: function () {
    const selection = this.get('selection'),
          item = this.get('item');

    return this.get('compareWithValue') ? selection === this.get('value') : selection === item;
  }.property('selection', 'item'),

  value: function () {
    var item = this.get('item'),
        valPath = this.get('optionValuePath');

    return valPath ? Ember.get(item, valPath) : item;
  }.property('optionValuePath', 'item')
});
