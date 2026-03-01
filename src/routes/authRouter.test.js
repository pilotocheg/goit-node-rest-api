import request from "supertest";

import connectDatabase from "../db/connect.js";
import initAppFolders from "../helpers/initAppFolders";
import app from "../server.js";

describe("/api/auth", () => {
  let server = null;
  beforeAll(async () => {
    await connectDatabase();
    await initAppFolders();
    const port = Number(process.env.PORT) || 3000;
    server = app.listen(port, () => {
      console.log(`Server is running. Use our API on port: ${port}`);
    });
  });
  afterAll(() => {
    server.close();
  });

  describe("GET /login", () => {
    test("valid login data", async () => {
      const loginData = {
        email: "some@test.com",
        password: "123456",
      };

      const { status, body } = await request(app)
        .post("/api/auth/login")
        .send(loginData);
      expect(status).toBe(200);
      const { user, token } = body;
      expect(token).toBeDefined();
      expect(typeof user.email).toBe("string");
      expect(typeof user.subscription).toBe("string");
    });

    test("invalid login data", async () => {
      const loginData = {
        email: "some@test.com",
        password: "12345",
      };

      const { status, body } = await request(app)
        .post("/api/auth/login")
        .send(loginData);
      expect(status).toBe(400);
      expect(typeof body.message).toBe("string");
    });
  });
});
