export default {
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['js', 'mjs'],
	testMatch: [
		"**/*.test.js",
		"**/*.test.mjs",
	],
	transform: {
		'\\.js$': 'babel-jest',
	},
}