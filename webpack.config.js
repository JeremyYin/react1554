

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

module.exports = {
    
    // entry property
    // 语法① entry: string|Array<string> 值可以是路径字符串和路径字符串数组。数组的时候表示将多个主入口文件导入到一个chunk（合并为一个文件）,值为路径字符串是`entry: { main: './src/app/.js'}`简写模式
    entry: './src/app.js',  // ①
    
    // 语法② entry: {[entryChunkName: string]: string|Array<string>}  具有最佳的扩展性，entryChunkName： 编译生成的chunk名，可以包含多个模块（js文件），一个chunk就是一个js文件。
    // 对于spa，可以通过CommonsChunkPlugin插件从‘应用程序bundle’提取彩虹面膜呢引用（common reference）到common bundle，并把vendor引用的部分替换为__webpack_require__()调用。【个人理解为提取公共模块】;
    // 提取公共模块代码参考：http://blog.csdn.net/github_26672553/article/details/52280655、https://segmentfault.com/a/1190000007498385、https://segmentfault.com/a/1190000007364512
    /*
    // ②③④⑤⑥⑥⑦⑧⑨⑨⑩
    entry: {
        app: './src/app.js',
        common: './src/common.js'
    },
    // 对于多页应用配置。  根据经验：每个 HTML 文档只使用一个入口起点。
    entry: {
        pageOne: './src/pageOne/index.js',
        pageTwo: './src/pageTwo/index.js',
        pageThree: './src/pageThree/index.js'
    },
    */
    

    // output property。 filename和path两个属性是必须的。
    // 几个变量[id]chunk的ID  [name]chunk的name，没有则使用ID替换 [hash]编译生命周期的hash [chunkhash]chunk的hash
    output: {
        filename: '[name]-[hash:5].js', // 用于命名每个文件，不能制定为绝对路径，路径基于path，无法使用[id]
        path: path.join(__dirname,'./dist')  // path must be absolute path
        //chunkFilename: 'chunk.js'  // 非入口的chunk的文件名，路径基于path
        //crossOriginLoading: false // 是否启用跨域加载- false/'anonymous'/'use-credentials' 后两个表明启用，在请求是否带凭据（credential）
        //publicPath: '/dist' 
        // The publicPath specifies the public URL address of the output files when referenced in a browser. For loaders that embed <script> or <link> tags or reference assets like images, publicPath is used as the href or url() to the file when it’s different than their location on disk (as specified by path). This can be helpful when you want to host some or all output files on a different domain or on a CDN. The Webpack Dev Server also uses this to determine the path where the output files are expected to be served from. As with path you can use the [hash] substitution for a better caching profile.
        // see: https://segmentfault.com/q/1010000007409246?_ea=1336702
    },
    
    
    module: {
        // you can use 'loaders' instead of 'rules' at webpack@1.x. at 2.x this property is deprecated
        rules: [
            {
                test: /\.js$/,
                // 'use' property' value can be an array of the item below 
                // see more at: https://webpack.js.org/configuration/module/#rule-use
                // the 'use' property can also replaced with loader, but 'use' is recommended.
                // use: 'css-loader'
                // use: [{loader:'css-loader'},{loader:'style-loader'}]
                // loader: 'css-loader'
                use: {
                    // loader's name must not shortened. ie. '-loader' can not be ommitted in 2.x.  loader can be chained one after one by useing '!', and the processed in order.
                    loader: 'babel-loader',
                    // the 'query' property is an alias for options, so the are the same
                    // see: https://webpack.js.org/configuration/module/#useentry
                    // tips: using query string are also work: 'babel-loader?presets[]=es2015&presets[]=react'  or 'babel-loader?{"presets"=["es2015", "react"]'
                    // instead of setting options property, you can use .babelrc file to config options's value
                    // g关于如何编写loader插件：http://www.css88.com/doc/webpack2/development/how-to-write-a-loader/、https://github.com/lcxfs1991/blog/issues/1
                    options: {   
                        presets: ['react', 'es2015'],
                        cacheDirectory: true // 缓存编译结果 以提高编译效率
                    }
                },
                // you can use 'include' property instead or use both
                // see: https://webpack.js.org/configuration/module/#condition for more.
                exclude: /node_modules/
            }
        ]
    },
    
    // Plugin proprty's value is a list of instance of plugins;
    plugins: [
        new webpack.optimize.UglifyJsPlugin(), // uglify 
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
    
    
}


/*
notes: 

compatibility

webpack 1.x | babel-loader <= 6.x
webpack 2.x | babel-loader >= 7.x (recommended) (^6.2.10 will also work, but with deprecation warnings)
webpack 3.x | babel-loader >= 7.1
see: https://github.com/babel/babel-loader for more detail.

babel的辅助方法会编译在每一个文件中，如果不想的话可以使用babel-runtime
see https://github.com/babel/babel-loader#babel-is-injecting-helpers-into-each-file-and-bloating-my-code for more details.

*/