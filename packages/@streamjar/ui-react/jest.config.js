module.exports = {
	"roots": [
	  "<rootDir>/src"
	],
	"transform": {
	  "^.+\\.tsx?$": "ts-jest"
	},
	"setupFilesAfterEnv": ["jest-extended", "./setup-jest.js"]
  }
