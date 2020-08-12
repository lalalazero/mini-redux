const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: process.env.WITH_PROVIDER === 'true' ? './example/with-provider/App.jsx' : './example/no-provider/App.jsx',
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                // loader: 'awesome-typescript-loader'
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                          '@babel/preset-env',
                          '@babel/preset-react',
                          '@babel/preset-typescript'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-class-properties'],
                            ['@babel/plugin-proposal-object-rest-spread']
                        ]
                      }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './example/index.html',
        })
    ],
    
}