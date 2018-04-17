var path = require('path');
var webpack = require('webpack');

var genWidgetConfig = function (widgetName) {
    var ext = '.ts';
    var extOut = '.js';
    //var c = 'MyCustomNamespace';
    return {
        name: "core",
       // target: "node",
        entry: './src/js/widgets/' + widgetName + '/js/widgets/' + widgetName + ext,
        output: {
            filename: widgetName + extOut,
            path: path.resolve(__dirname, 'dist/packages/widgets'),
            //publicPath: './dist/'
        },
        externals: {
            "akumina-core": "Akumina",
            "jquery": "jQuery"
        },
        resolve: {
            extensions: ['.ts']
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                Akumina: "akumina"
            }),
        ],
        module: {
            rules: [
                { test: /\.ts?$/, loader: 'ts-loader' }
            ]
        }
    };

};


module.exports = [
    genWidgetConfig('WIDGETNAME')
];