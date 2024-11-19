// // .eleventy.js
// const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// module.exports = function(eleventyConfig) {
//   // Add syntax highlighting
//   eleventyConfig.addPlugin(syntaxHighlight);
  
//   // Copy static assets
//   eleventyConfig.addPassthroughCopy("src/css");
//   eleventyConfig.addPassthroughCopy("src/js");
//   eleventyConfig.addPassthroughCopy("src/assets");

//   eleventyConfig.setNunjucksLiquidCompatibility(true);
//   eleventyConfig.setLiquidOptions({
//     dynamicPartials: false,
//     strictFilters: false
//   });


//   return {
//     dir: {
//       input: "src",
//       output: "_site",
//       includes: "_includes",
//       layouts: "_layouts"
//     },
//     templateFormats: ["md", "njk"],
//     markdownTemplateEngine: "njk"
//   };
// };

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  // Add syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight);
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Configure Nunjucks to ignore unknown variables
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
    autoescape: false
  });

  return {
    pathPrefix: "/website_nuke/",
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