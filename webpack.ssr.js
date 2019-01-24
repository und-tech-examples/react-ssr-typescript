const path = require('path');
const webpack = require('webpack');

module.exports = (env={}) => {
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
    return {
        entry: path.resolve(__dirname, 'client/ssr.tsx'),
        output: {
            path: path.resolve(__dirname, 'server/dist'),
            publicPath: '/dist/',
            filename: "server.js",
            libraryTarget: "umd",
            globalObject: "this",
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'awesome-typescript-loader'
                    }
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin(envKeys)
        ]
    }
};