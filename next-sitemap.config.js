/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL || "https://the-infinitys.f5.si",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "./out",
  output: "export",
};
