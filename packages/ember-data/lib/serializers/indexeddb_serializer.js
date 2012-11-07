var get = Ember.get;

DS.IndexedDBSerializer = DS.Serializer.create({
  addId: function(hash, type, id) {
    hash.id = [type.toString(), id];
  },

  extractId: function(type, hash) {
    // newly created records should not try to materialize
    if (hash && hash.id) { return hash.id[1]; }
  },

  addBelongsTo: function(hash, record, key, relationship) {
    hash[relationship.key] = get(get(record, key), 'id');
  },

  addHasMany: function(hash, record, key, relationship) {
    var ids = get(record, key).map(function(child) {
      return get(child, 'id');
    });

    hash[relationship.key] = ids;
  }
});