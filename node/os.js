const os = require("os");

console.log("Host:", os.hostname());
console.log("Platform:", os.platform());
console.log("CPU architecture:", os.arch());
console.log("Total memory:", toGB(os.totalmem()), "GB");
console.log("Uptime:", toHours(os.uptime()), "hours");

function toGB(bytes) {
  return (bytes / (1024 * 1024 * 1024)).toPrecision(2);
}

function toHours(seconds) {
  return (seconds / 3600).toPrecision(2);
}
