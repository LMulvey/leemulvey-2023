const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./__blog/**/*", "./__projects/**/*"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
};

module.exports = nextConfig;
