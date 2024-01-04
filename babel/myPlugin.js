module.exports = function (babel) {
    return {
        visitor: {
            CallExpression() {
                console.log(arguments)
            }
        }
    }
}