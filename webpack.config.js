const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const getMode = (env)=>{
    const isDevelopment
    = (env.debug) && true
    ;
    if(isDevelopment) return ["debug", "development"]
    const isProduction
    = (env.release) && true
    ;
    if(isProduction) return ["release", "production"]
    return ["release", "production"];
}
module.exports = (env) => {
    console.log(env)
    const [modename, mode] = getMode(env);
    const tsConfig = {
        mode: mode,
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        }
    }
    return [
        {
            name: 'database',
            target: 'node',
            entry: './src/database/main.ts',
            ...tsConfig,
            output: {
                filename: 'database.js',
                path: path.resolve(__dirname, `dist/${modename}`),
            },
            externals: { 'sqlite3':'commonjs sqlite3', }
        },
        {
            name: 'server',
            target: 'node',
            entry: './src/server/main.ts',
            ...tsConfig,
            output: {
                filename: 'server.js',
                path: path.resolve(__dirname, `dist/${modename}`),
            },
        },
        {
            name: 'client',
            target: 'web',
            entry: './src/client/index.tsx',
            ...tsConfig,
            plugins:[
                new CopyPlugin({
                    patterns:[
                        {from: "wwwroot" }
                    ]
                }),
                new HtmlWebpackPlugin({
                    template: './view/index.html',
                    filename: 'index.html',
                })
            ],
            output: {
                filename: 'client.js',
                path: path.resolve(__dirname, `dist/${modename}/wwwroot`),
            },
            devServer:{
                contentBase: path.resolve(__dirname, `dist/${modename}/wwwroot`),
                proxy: {
                    '/api':{
                        target: 'http://localhost:5000',
                        secure: false
                    }
                }
            },
        }
    ]
};