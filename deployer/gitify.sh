#!/bin/bash -e

################################################################
#
#	Makes fresh public .git repository from application
#
################################################################

cd ..
rm -fr .git
git init
git add -A .
git commit -m "gitified from deployer"



