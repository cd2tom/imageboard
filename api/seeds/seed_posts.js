exports.seed = function(knex, Promise) {
  return knex("posts")
    .del()
    .then(function() {
      return knex("posts").insert([
        {
          id: 1,
          name: "",
          body: "Hi guys this is the first post!",
          threadsId: 1,
          usersId: 1
        },
        {
          id: 2,
          name: "",
          body: "wow cool post, nerd",
          threadsId: 1
        },
        {
          id: 3,
          name: "",
          body: "I'm the second thread's first post!",
          threadsId: 2
        },
        {
          id: 4,
          name: "",
          body: "first thread was better",
          threadsId: 2
        }
      ]);
    });
};
