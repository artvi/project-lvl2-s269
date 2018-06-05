install:
	npm install
publish:
	npm publish
start:
	npm run babel-node -- src/bin/gendiff.js
lint:
	npm run eslint .
test:
	npm test
