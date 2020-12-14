const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/test", (req, res, next) => {
  res.status(200).json({ server_status_test: "oke" });
  next();
});

app.listen(port, () => {
  console.log(`🔥🔥🔥 Server running on port ${port}`);
});
