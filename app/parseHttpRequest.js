function HttpHeader(buf) {
  this.parse(buf);
}

HttpHeader.prototype.parse = function (buf) {
  const bufSplit = buf.split("\r\n");
  for (let i = 0; i < bufSplit.length; i++) {
    if (i === 0) {
      const action = bufSplit[i].split(" ");
      this.action = action[0];
      this.path = action[1];
      this.protocol = action[2];
    } else {
      const property = bufSplit[i].split(": ");
      if (property[1]) {
        this[`${property[0]}`] = property[1].split(",");
      }
    }
  }
};

module.exports = HttpHeader;
