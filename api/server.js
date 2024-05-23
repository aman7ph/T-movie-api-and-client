import Express from "express";

const app = Express();

app.get("/", (req, res) => {
  res.send("love");
});

app.listen(5050, () => {
  console.log(`app listening on port 5050`);
});
