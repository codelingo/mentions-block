module.exports = {
    verbose: true,
    testEnvironment: "jsdom",
    moduleNameMapper: {
        ".(css|less|scss)$": "identity-obj-proxy",
    }, 
    allowJs: true,
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
    },
    transformIgnorePatterns: ["./node_modules/@codelingo/(?!react-tiny-popover/)"]
  };