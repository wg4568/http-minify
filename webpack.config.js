const { triggerAsyncId } = require("async_hooks");
const path = require("path");

module.exports = {
    entry: "./src/main.ts",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        watchContentBase: true,
        port: 8080
    }
};
