const request = require("supertest");
const { knex } = require("../models");
const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

beforeEach(async () => await truncate());

describe("Route POST  /sessions", () => {
  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User", { password: "123456" });

    const response = await request(app)
      .post("/sessions?tenantId=test")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app)
      .post("/sessions?tenantId=test")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const user = await factory.create("User", { password: "123456" });

    const response = await request(app)
      .post("/sessions?tenantId=test")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard?tenantId=tenant01")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without jwt token", async () => {
    const response = await request(app).get("/dashboard?tenantId=tenant01");
    expect(response.status).toBe(401);
  });

  it("should not able to access private routes with invalid jwt token", async () => {
    const response = await request(app)
      .get("/dashboard?tenantId=tenant01")
      .set("Authorization", "Bearer 123123");

    expect(response.status).toBe(401);
  });
});

afterAll(() => knex.destroy());
