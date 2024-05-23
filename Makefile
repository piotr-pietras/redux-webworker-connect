dev: 
	cd example && npm run dev
build:
	npm run build
	cp -r ./dist ./example/src
	cp -r ./dist ./example/node_modules/webworker-redux-connected
	cp package.json ./example/node_modules/webworker-redux-connected
	cp -r ./dist ./example-webpack/node_modules/webworker-redux-connected
	cp package.json ./example-webpack/node_modules/webworker-redux-connected


