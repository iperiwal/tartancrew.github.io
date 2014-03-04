# Makefile for personal webstie.
all:
	jade --pretty source/fundraising.jade source/index.jade source/current.jade source/board.jade source/prospective.jade source/alumni.jade --out . --obj `echo data.json`
	scss --update source/scss:css
pretty:
	cp data.json back
	node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync(process.argv[1])), null, 4));" back > data.json
	rm back
