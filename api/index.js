import express from "express";
import router from "./router/router.js";

const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

app.use("/", router);

export default app;
