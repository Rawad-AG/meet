import "./config/env.js";

import app from "./app.js";
import { ENV } from "./config/env.js";

app.listen(ENV.PORT, () => {
  console.log(
    `🚀 [${ENV.PROFILE}] Meet Server: ${ENV.PROTOCOL}://${ENV.HOST}:${ENV.PORT}`,
  );
});
