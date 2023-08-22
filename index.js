const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const cors = require('cors')

require('dotenv/config');

app.use(cors())
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

app.use("/", require("./routes/router"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));