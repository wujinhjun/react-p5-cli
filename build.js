const { build } = require('esbuild');

async function runBuild() {
    const result = await build({
        entryPoints: ["src/main.js"],
        outfile: "out/main.js",
        bundle: true,
        platform: "node",
        format: "cjs",
        minify: true,
        write: true,
        external: ["electron"]
    })

    console.log(result);
};

runBuild();