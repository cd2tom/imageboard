exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        { id: 1, name: "tom", email: "tomfinney25@gmail.com" }
      ]);
    });
};
