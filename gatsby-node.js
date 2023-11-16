const path = require("path");

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-apexcharts/,
            use: loaders.null(),
          },
        ],
      },
      resolve: {
        alias: {
          "@/components": path.resolve(__dirname, "src/components"),
          "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
        },
      },
    });
  }
};
