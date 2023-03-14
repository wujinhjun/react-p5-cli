const esbuild = require('esbuild');

const options = {
    entryPoints: ["src/index.js"],
    outfile: "dist/scode-tool.js",
    bundle: true,
};

esbuild.buildSync(options);