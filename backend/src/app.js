const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const path = require(
  "path"
);



const app = express();


app.use(express.json());
app.use("/api", routes);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
);

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

module.exports = app;