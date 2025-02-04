const { i18n } = require('./next-i18next.config');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // output: 'export',  // 生成静态站点
  assetPrefix: isProd ? './' : '', // GitHub Pages 资源路径
  images: {
    unoptimized: true
  },
  i18n,
};
