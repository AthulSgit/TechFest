function cleanObject(value) {
  if (Array.isArray(value)) {
    return value.map(cleanObject);
  }

  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      if (key.startsWith("$") || key.includes(".")) {
        delete value[key];
      } else {
        value[key] = cleanObject(value[key]);
      }
    }
  }

  return value;
}

const sanitize = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = cleanObject(req.body);
  }

  next();
};

module.exports = sanitize;