# Makefile for personal webstie.
all:
	jade source/index.jade source/current.jade source/board.jade source/prospective.jade source/alumni.jade --out . --opt `echo source/options.js`
	scss --update source/scss:css
