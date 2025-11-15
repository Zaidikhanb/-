const fs = require('fs');
module.exports = (req,res) => {
  const files = fs.readdirSync('.').filter(f => f.endsWith('.vcf'));
  if(files.length === 0) return res.status(404).send('no vcf files');
  let out = '';
  files.forEach(f => { out += fs.readFileSync(f) + '\n'; });
  res.setHeader('Content-Disposition','attachment; filename="ali_institute_contacts.vcf"');
  res.setHeader('Content-Type','text/vcard');
  res.send(out);
};