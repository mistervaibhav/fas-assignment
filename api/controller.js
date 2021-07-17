const data = require('./data.json');

const limit = 10;

const controller = (req, res) => {
  const { page } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return res.status(200).json([...data.slice(startIndex, endIndex)]);
};

module.exports = {
  controller,
};
