const CracoLessPlugin = require("craco-less-fix");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#f47c01" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
