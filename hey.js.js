module.exports = {
    port: 9012,
    root: "dist",
    webpack: {
        console: true,
        publicPath: "/",
        output: {
            "./index.html": {
                entry: "./src/app",
                commons: ['common']
            }
        },
        commonTrunk: {
            common: [
                "manba",
                "js-model",
                "./src/js/common/utils",
                "./src/js/common/request",
                "./src/js/common/api",
                'hey-global',
                'hey-log',
                "heyui",
                "vue",
                "vuex",
                "vue-router"
            ]
        },
        alias: {
            model: './src/js/model/',
            js: './src/js/',
            components: './src/components/',
        },
        global: {
            "Utils": './src/js/common/utils',
            "Manba": 'manba',
            "HeyUI": 'heyui',
            "Model": "js-model",
            "G": 'hey-global',
            "log": 'hey-log',
            "R": './src/js/common/request',
            "Api": "./src/js/common/api",
        },
        devServer: {
            "proxy": {
                "/api": {
                    "target": "http://localhost:5000"
                }
            },
            historyApiFallback: true
        },
        globalVars: './src/css/var.less',
        externals: {}
    },
    copy: ['static/images/*']
};