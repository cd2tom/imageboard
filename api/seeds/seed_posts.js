exports.seed = function(knex, Promise) {
  return knex("posts")
    .del()
    .then(function() {
      return knex("posts").insert([
        {
          id: 1,
          subject: "first",
          body: "Hi guys this is the first thread!",
          usersId: 1,
          boardsId: 1
        },
        {
          id: 2,
          body: "wow cool post, nerd",
          threadsId: 1,
          boardsId: 1
        },
        {
          id: 3,
          body: "I'm the second thread",
          threadsId: 2,
          boardsId: 1
        },
        {
          id: 4,
          name: "",
          body: "first thread was better",
          threadsId: 2,
          boardsId: 1
        }
      ]);
    });
};
