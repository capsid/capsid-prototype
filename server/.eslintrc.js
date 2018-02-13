module.exports = {
    parser: "babel-eslint",
    env: {
      node: true
    },
    extends: ["eslint:recommended", "google", "prettier"],
    plugins: ["prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
  };