const express = require('express');
const path = require('path');
const app = express();
const ResultDapp = require('./build/contracts/ResultDapp.json');

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/abi', (req, res) => {
  res.json(ResultDapp.abi);
});

app.get('/address', (req, res) => {
  const networkId = Object.keys(ResultDapp.networks)[0];
  const address = ResultDapp.networks[networkId].address;
  res.json({ address });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
