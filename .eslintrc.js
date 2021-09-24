module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		// suppress errors for missing 'import React' in files
		"react/react-in-jsx-scope": "off",
		// suppress errors for missing prop types validation
		"react/prop-types": "off",
	},
};
