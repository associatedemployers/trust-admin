import DS from 'ember-data';

export default DS.Store.extend({
  /**
   * store#findOneQuery
   * 
   * From https://github.com/emberjs/data/issues/1576
   * 
   * @param  {String|DS.Model} type
   * @param  {String|Integer} id
   * @param  {Object} query
   * @return {Promise}
   *
   * Usage:
   * this.store.findOneQuery('model', params.id, { myParameter: 'Yay' });
   */
  findOneQuery: function ( type, id, query ) {
    var store       = this,
        typeClass   = store.modelFor(type),
        adapter     = store.adapterFor(typeClass),
        serializer  = store.serializerFor(typeClass),
        url         = adapter.buildURL(type, id),
        ajaxPromise = adapter.ajax(url, 'GET', { data: query });

    return ajaxPromise.then(function ( rawPayload ) {
      var extractedPayload = serializer.extract(store, typeClass, rawPayload, id, 'find');
      return store.push( typeClass, extractedPayload );
    });
  }
});
