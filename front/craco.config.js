const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          utils: "./src/utils",
        },
      },
    },
  ],
};

//Más info: https://github.com/risenforces/craco-alias
