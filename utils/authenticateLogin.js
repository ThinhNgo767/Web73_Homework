const authenticateLogin = async (body, ...data) => {
  const user = data.find((res) => res.username === body.username);

  if (!user) {
    throw new Error("Account not found");
  }

  if (user.password !== body.password) {
    throw new Error("Wrong password");
  }

  return user;
};

module.exports = authenticateLogin;
