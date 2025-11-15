module.exports = (req,res) => {
  const pass = req.query.password || '';
  if(process.env.ADMIN_PASS && pass === process.env.ADMIN_PASS) return res.send('1');
  return res.send('0');
};