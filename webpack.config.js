const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env={}) => {
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        entry: './client/index.tsx',
        output: {
            path: path.resolve(__dirname, 'client/dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        devtool: 'source-map',
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
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'client/public/index.html'),
            }),
            new webpack.DefinePlugin(envKeys)
        ]
    }
}