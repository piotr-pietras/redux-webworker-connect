dev: 
	cd example && npm run dev
build:
	npm run build
	cp ./src/worker.js ./dist/worker.js
	cp -r ./dist ./example/src


