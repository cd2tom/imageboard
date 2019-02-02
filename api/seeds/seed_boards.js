exports.seed = function(knex, Promise) {
  return knex("boards")
    .del()
    .then(function() {
      return knex("boards").insert([{ id: 1, name: "default", handle: "d" }]);
    });
};
