const test = require("node:test");
const assert = require("node:assert/strict");

const sanitize = require("../middleware/sanitize");

test("Sanitizer should remove MongoDB operator keys", () => {
  const req = {
    body: {
      name: "Test User",
      email: {
        "$ne": null
      }
    }
  };

  sanitize(req, {}, () => {});

  assert.deepEqual(req.body, {
    name: "Test User",
    email: {}
  });
});

test("Sanitizer should remove dotted keys", () => {
  const req = {
    body: {
      "user.email": "test@example.com",
      name: "Test User"
    }
  };

  sanitize(req, {}, () => {});

  assert.deepEqual(req.body, {
    name: "Test User"
  });
});