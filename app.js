const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

const routes = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`🔥🔥🔥 Server running on port ${port}`);
});
