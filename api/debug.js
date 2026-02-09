
module.exports = (req, res) => {
  res.status(200).json({ 
    message: "Debug endpoint working (CommonJS)", 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
};
