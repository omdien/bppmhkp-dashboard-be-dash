import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`Dashboard service running on port ${PORT}`);
});