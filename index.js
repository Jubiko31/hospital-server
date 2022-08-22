require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cors());

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started listening on port ${PORT}...`));
