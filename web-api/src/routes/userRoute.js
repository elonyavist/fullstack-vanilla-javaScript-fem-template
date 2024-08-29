import { DEFAULT_HEADERS } from "../utils/utils.js";
import { once } from "node:events";

const routes = ({ userFactory }) => ({
  "/users:get": async (request, response) => {
    const users = await userFactory.find();
    response.writeHead(200, DEFAULT_HEADERS);

    return response.end(JSON.stringify(users));
  },
  "/users:post": async (request, response) => {
    // with this method we get data from the request
    const dataBuffer = await once(request, "data");

    const dataJson = JSON.parse(dataBuffer);

    await userFactory.create(dataJson);

    response.writeHead(201, DEFAULT_HEADERS);
    return response.end(JSON.stringify({ message: "User created" }));
  },
});

export { routes };
