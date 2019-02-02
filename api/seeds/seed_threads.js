exports.seed = function(knex, Promise) {
  return knex("threads")
    .del()
    .then(function() {
      return knex("threads").insert([
        { id: 1, name: "the first thread!", boardsId: 1 },
        { id: 2, name: "the second thread!", boardsId: 1 }
      ]);
    });
};
