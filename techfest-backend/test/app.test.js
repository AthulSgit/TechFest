const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../app");

test("GET / should return backend status", async () => {
  const response = await request(app).get("/");

  assert.equal(response.status, 200);
  assert.equal(
    response.body.message,
    "TechFest 2026 Backend is running"
  );
});

test("Unknown route should return 404", async () => {
  const response = await request(app).get("/unknown-route");

  assert.equal(response.status, 404);
  assert.equal(response.body.message, "Route not found");
});