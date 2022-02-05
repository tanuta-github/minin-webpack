const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'
const TerserPlugin = require('terser-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { options } = require('less')

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (!isDev)
        config.minimizer =[new TerserPlugin(), new OptimizeCssAssetsPlugin()]

    return config
}
const filename = ext => isDev ? '[name].'.ext : '[name].[contenthash].'.ext
const cssloaders = extra => {
    const loaders = {}
    if (extra)
      loaders.extra = extra
}
const babelOptions = preset => {
    const opts = {
        presets: ['@babel/preset-env']
    }
    if (preset) {
        opts.presets.push(preset);
    }
    return opts
}
const jsLoaders = () => {
    const loaders = {
        loader: 'babel-loader',
        options: babelOptions()
      }
      /*if (isDev) {
          loaders.loader.push('eslint-loader')
          loaders.options.eslintPath = './.eslintrc'
      }*/
    return [loaders]
}
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    devtool: 'source-map',//isDev ? 'source-map': '',
    entry: { 
        main:['@babel/polyfill', './index.jsx'], 
        analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'), //'[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    }, 
    devServer: {
        port: "4200",
        hot: isDev
    },
    resolve: {
        extensions: ['.js', '.json', '.png'], 
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(), 
        new CopyWebpackPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist') }
            ],
          }),
        new  MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'// filename('css'), //
        }), 
        new BundleAnalyzerPlugin()
                
        
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        //hmr: isDev,
                        //reloadAll: true
                    }
                }, 'css-loader']
            }, 
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                       // hmr: isDev,
                        //reloadAll: true
                    }
                }, 'css-loader', 'less-loader']
            }, 
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, 'css-loader', 'sass-loader']
            }, 
            {
                test: /\.(png|jpg|svg|gif)$/, 
                use: ['file-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
              },
              {
                  test: /\.ts$/,
                  exclude: /node_modules/,
                  use: {
                    loader: "babel-loader",
                    options:babelOptions('@babel/preset-typescript')
                  }
                },
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: {
                      loader: "babel-loader",
                      options:babelOptions('@babel/preset-react')
                    }
                  }
            
            /*, 
            {
                test: /\.(ttf|woff|woff2|eot)$/, 
                use: ['file-loader']
            }*/
        ]
    }
}