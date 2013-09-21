#!/bin/bash -e

# zips up spaceen by ignoring "prod" and .git subfolders

#MYTIME=$(date +"%Y-%m-%d-%H-%M-%S")
MYTIME=$(date +"%H-%M-%S")
MYFILE="spaceen"

ZIPFILE="$MYFILE-$MYTIME.zip"

cd ..
cd ..
rm -f $ZIPFILE
zip -rq $ZIPFILE $MYFILE -x "spaceen/prod/*" -x "spaceen/.git/*"
echo "$MYFILE is zipified to $ZIPFILE"


#alternative? zip -rq spaceen spaceen -x spaceen/prod\*

#http://superuser.com/questions/312301/unix-zip-directory-but-excluded-specific-subdirectories-and-everything-within-t


