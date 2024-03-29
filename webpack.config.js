var path = require('path');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'srcjs', 'nebula.jsx'),
    output: {
        path: path.join(__dirname, 'inst', 'www', '${package}', 'nebula'),
        path: path.join(__dirname, 'inst/htmlwidgets'),
        filename: 'nebula.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    exclude: /mapbox-gl/
                }
            }
        ]
    },
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'reactR': 'window.reactR'
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
