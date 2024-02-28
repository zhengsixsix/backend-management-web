module.exports = {
    plugins: {
        // to edit target browsers: use "browserslist" field in package.json
        'postcss-import': {},
        'postcss-pxtorem': {
            rootValue: 10, //根字体大小
            propList: ['*'], //说明font-size忽略，不进行转化
        },
    },
};