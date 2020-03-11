module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            "component",
            {
                libraryName: "element-ui",
                styleLibraryName: "~src/assets/theme"
            }
        ]
    ]
}
