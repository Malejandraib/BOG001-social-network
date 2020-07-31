module.exports = {
    entry: './src/main.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [
        {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {attributes: {
            root: '.',
        }}
        
        },

        { test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
    ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

};    