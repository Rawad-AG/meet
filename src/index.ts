import "./config/env.js";

import httpServer from "./app.js";
import { ENV } from "./config/env.js";
import "./routes/SocketRouter.js";

httpServer.listen(ENV.PORT, () => {
  console.log(
    `🚀 [${ENV.PROFILE}] Meet Server: ${ENV.PROTOCOL}://${ENV.HOST}:${ENV.PORT}`,
  );
});
