const USERS = require("../mock/users");

const authenticate = (username, password) => {
  const user = USERS.find((user) => user.username === username);

  if (!user) {
    throw new Error("Account not found");
  }

  if (user.password !== password) {
    throw new Error("Wrong password");
  }
  const response = {
    username: user.username,
    gender: user.gender,
    age: user.age,
    id: user.id,
  };
  const data = user.isAdmin
    ? { ...response, accessToken: "YOU_IS_ADMIN" }
    : response;

    return data
};

module.exports = authenticate;
