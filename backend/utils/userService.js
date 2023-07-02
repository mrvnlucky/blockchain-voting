const { decryptText } = require("./encryption");

const getPrivateKeyFromDatabase = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return console.error("User doesn't exist");
  }
  const hashedPrivateKey = user.hashedPrivateKey;
  const privateKey = decryptText(hashedPrivateKey);
  return privateKey;
};

module.exports = {
  getPrivateKeyFromDatabase,
};
