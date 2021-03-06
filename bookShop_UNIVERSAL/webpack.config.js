// webpack 4

const path = require("path");

const webpack = require("webpack");

module.exports = {
    mode: "none",
    entry: ["babel-polyfill", "./src/client.js"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "react", "stage-1"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
