const { networkInterfaces } = require("os");

const systemIpAddress = () => {
  const netInterfaces = networkInterfaces();
  const results = {};

  for (const name of Object.keys(netInterfaces)) {
    for (const netInterface of netInterfaces[name]) {
      if (netInterface.family === "IPv4" && !netInterface.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(netInterface.address);
      }
    }
  }

  return results;
};

module.exports = systemIpAddress();
