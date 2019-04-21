const path = require('path')

const webpack = require('webpack')

const htmWebpackPlugin = require('html-webpack-plugin')

// vue-loader 15版本以上必须引用一下插件才能使用
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {

    //入口
    entry: path.join(__dirname, './src/main.js'),

    // 出口文件
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {// 配置DEV-server
        open: true, // 自动打开浏览器
        port: 3000, // 设置启动时候的运行端口
        contentBase: 'src', // 指定托管目录
        hot: true // 启用热更新
    },
    plugins: [ // 配置插件的节点
        new webpack.HotModuleReplacementPlugin(), // new一个热更新的对象
        new htmWebpackPlugin({ // 创建在内存中生成HTML页面的插件
            template: path.join(__dirname, './src/index.html'),// 指定末班页面
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),// new一个vue对象
    ],
    module: { // 这个节点用于第三方加载器
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 配置处理.css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },// 配置处理.less文件的第三方规则
            // { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7632' }, 
            // limit给定的值是图片的大小，单位是byte， 如果我们引用的图片，大于或等于给定的limit值，则不会被转为base64格式的字符串，否则相反
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader' }, // 配置处理图片路径的loader
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理字体文件的配置
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置Babel来转换高级语法
            { test: /\.vue$/, use: 'vue-loader' } // 处理.vue文件的loader

        ]
    },
    resolve: {
        alias: {
            // "vue$": "vue/dist/vue.js"
        }
    }

}