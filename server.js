const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const { Middleware } = require("./Middlewares/middleware");
const { routes } = require("./Routes/routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Middleware);

routes(app);

const port = process.env.PORT || 8000;
const URI_DB = process.env.MONGO_URI;
mongoose
  .connect(URI_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: 'majority' }
  })
  .then(() => {
    app.listen(port, function () {
      console.log(`running on http://localhost:${port}`);
    });
  });
