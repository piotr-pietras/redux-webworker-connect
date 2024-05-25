dev: 
	cd example && npm run dev
build:
	npm run build
	cp -r ./dist ./example-webpack/node_modules/webworker-redux-connected
	cp package.json ./example-webpack/node_modules/webworker-redux-connected
	cp -r ./dist ./example-vite/node_modules/webworker-redux-connected
	cp package.json ./example-vite/node_modules/webworker-redux-connected


