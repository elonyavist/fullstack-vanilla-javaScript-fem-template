import { parse, fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { routes } from "./routes/userRoute.js";
import { DEFAULT_HEADERS } from "./utils/utils.js";
import { generateInstance } from "./factory/userFactory.js";

//with this method we can import data from the json file
//import data from "./../database/data.json" assert { type: "json" };

//with the new ES6 modules we can't use __dirname and __filename anymore,
// so we have to use the fileURLToPath and dirname to get the current directory, get from import.meta.url
const currentDir = dirname(fileURLToPath(import.meta.url));
const filePath = join(currentDir, "..", "database", "data.json");

const userFactory = generateInstance({ filePath });
const userRoutes = routes({
  userFactory,
});

const allRoutes = {
  ...userRoutes,
  default(request, response) {
    response.writeHead(404, DEFAULT_HEADERS);
    response.write(JSON.stringify({ message: "URL Not Found" }));

    response.end();
  },
};

function handler(request, response) {
  const { url, method } = request;

  const { pathname } = parse(url, true);

  const key = `${pathname}:${method.toLowerCase()}`;

  const chosen = allRoutes[key] ?? allRoutes.default;

  // we have to create a promise because some routes could be async, like write/read to the db etc. With this code we can handle both sync and async routes plus errors
  return Promise.resolve(chosen(request, response)).catch((error) => {
    console.error(error);
  });
}

export default handler;
