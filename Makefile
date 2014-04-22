# Makefile for personal webstie.
all:
	jade --pretty source/index.jade source/prospective.jade source/rowers.jade source/fundraising.jade source/staff.jade source/alumni.jade source/donate.jade --out . --obj data.json
	scss --update source/scss:css
start:
	make all
	when-changed -r source/ -c make
pretty:
	cp data.json back
	node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync(process.argv[1])), null, 4));" back > data.json
	rm back
