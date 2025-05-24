export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        '\\.svg\\?react$': '<rootDir>/__mocks__/svgReactMock.tsx',
        '\\.svg$': '<rootDir>/__mocks__/fileMock.js',
        './envConfig': '<rootDir>/__mocks__/envConfig.ts',
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};