module.exports = function (ctx) {
  let options = ctx;
  return {
    plugins: {
      "postcss-normalize": options.nano ? false : {},
      "postcss-preset-env": options.nano
        ? false
        : { autoprefixer: false, stage: 3, minimumVendorImplementations: 2 },
      autoprefixer: options.nano ? false : {},
      cssnano: options.nano ? {} : false,
    },
  };
};
