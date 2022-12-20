const CracoLessPlugin = require("craco-less-fix");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#48949b" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
