patch: build push-all version-patch publish

build:
	npm run build

version-patch:
	npm version patch

push-all: push push-tags

push:
	git push origin master

push-tags:
	git push --tags

publish:
