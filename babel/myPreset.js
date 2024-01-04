module.exports = () => ({
    preset: [
        require("@babel/preset-env"),
    ],
    plugins: [
        ["@babel/plugin-propodsal-decorators",{"legacy":true}],
        ["@babel/plugin-propodsal-class-properties",{"loose":true}],
        [require("./myPlugin")]
    ]
});