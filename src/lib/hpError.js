class hpError extends Error {
  constructor(type = "general", ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, hpError);
    }

    this.type = type;
    this.date = new Date();
  }
}

export default hpError;
