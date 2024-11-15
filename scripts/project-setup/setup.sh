#!/bin/sh
#
# A script to install all the things needed to setup the project dev tools
# For now, we only have the pre-commit hook

# Coping git hooks to .git/hooks folder

cp -R ../git/hooks/* ../../.git/hooks/

exit 0
