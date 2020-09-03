module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ['./setup.js'],
    testPathIgnorePatterns: [
        '<rootDir>/esm',
        '<rootDir>/cjs'
    ],
    testMatch: ["src/**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"]
}