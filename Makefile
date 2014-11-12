js/app.js: _js/app.js node_modules
	./node_modules/.bin/browserify $< -e $< -o $@

node_modules: package.json
	npm update
	touch $@
