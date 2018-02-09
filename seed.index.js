require("babel-polyfill");
require("@babel/register")({
  presets: ["@babel/env"],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-object-rest-spread"
  ]
});

require("./seed");
