module.exports = {
     publicPath: './',
    devServer: {
        proxy: {
            '/api': {
            // '/': {
                //学校的
                target: 'http://hdqg.hdu.edu.cn/api',
                // 冯源的
                // target: 'http://192.168.43.116:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                    // '^/': ''
                }
            }
        }
    }
}


