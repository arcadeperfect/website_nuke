const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {

  // Configure markdown-it with markdown-it-attrs
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);


  // Add syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk"
  };
};