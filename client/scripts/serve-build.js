const path = require('path');
const express = require('express');
const cors = require('cors');

const rootDir = path.resolve(__dirname, '..', 'build');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static(rootDir));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
