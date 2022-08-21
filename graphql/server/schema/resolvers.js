const { UserList, MovieList } = require("../Fakedata");
const _ = require("lodash");

const resolvers = {
  Query: {
    users: () => {
      if (UserList) return { users: UserList };
      return { message: "There was an ERRORIIIIII" };
    },
    user: (parent, args) => {
      const { id } = args;
      const user = _.find(UserList, { id: parseInt(id) });
      return user;
    },
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const { name } = args;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },

  UsersResult: {
    __resolveType(obj) {
      if (obj.users) {
        return "UsersSuccessfulResult";
      }
      if (obj.message) {
        return "UsersErrorResult";
      }
      return null;
    },
  },
};

module.exports = resolvers;
