module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        [
            "component",
            {
                libraryName: "element-ui",
                styleLibraryName: "~src/assets/theme"
            }
        ]
    ]
}
