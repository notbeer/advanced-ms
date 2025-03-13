export default {
    preset: "ts-jest",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    extensionsToTreatAsEsm: [".ts"],
    globals: {
      "ts-jest": {
        useESM: true,
      },
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testEnvironment: "node",
};