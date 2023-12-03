const getDataFromMongoDB = async (collection) => {
  try {
    const result = await collection.find({}).toArray();

    return result;
  } catch (error) {
    return error;
  }
};

module.exports = getDataFromMongoDB