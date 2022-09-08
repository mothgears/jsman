export default {
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['js', 'mjs', 'cjs', 'es6'],
	testMatch: [
		"**/*test.js",
		"**/*test.es6",
	],
	transform: {
		'\\.(js|es6)$': 'babel-jest',
	},
}