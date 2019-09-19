class UndefinedAttribute extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.status = 404;
  }

  statusCode() {
    return this.status;
  }
}

module.exports = UndefinedAttribute;
