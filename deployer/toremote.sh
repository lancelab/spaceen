#!/bin/bash

#  //\\// Builds and deploys prod version to folder $ALPHA in remote host



#HOST="konstantin@127.0.0.1"
#HOST="konstantin@192.168.1.101"
#HOST="landkey@landkey.net"

#HOST="naladchik@127.0.0.1"
#FOLDER="/var/www/w/"

HOST="landkeyo@landkey.org"
FOLDER="/home1/landkeyo/public_html/Sandbox/z/"

ALPHA="spaceen"
PROJECT_PARENT_PATH=".."				#deepness of app root in project parent
PROJECT_FOLDER_NAME="spaceen"
PROJECT_ROOT="$PROJECT_PARENT_PATH/$PROJECT_FOLDER_NAME"


#: deployes only these units
DEPLOYED_FOLDERS="prod dev captured"
DEPLOYED_FILES="*"

#stubs:
#echo "$HOST:$FOLDER"
#echo ${HOST}:${FOLDER}

# * use this if running from occasional place
#cd /var/www/METAP/apps/BOARD/board/public/play/deployer/

./toprod.sh

rm -rf ../$ALPHA
mkdir ../$ALPHA


cd .. 
cp -rf $DEPLOYED_FOLDERS $ALPHA
cp -f $DEPLOYED_FILES $ALPHA


rm -f $ALPHA.zip
echo "... archiving $ALPHA"
zip -r -q $ALPHA $ALPHA
rm -rf $ALPHA

# * exit here if you don't have a remote server to deploy
# exit

scp $ALPHA.zip ${HOST}:${FOLDER}
ssh $HOST <<END_OF_MY_COMMANDS
cd "$FOLDER"
rm -rf w
mkdir w
mv -f $ALPHA.zip w
cd w
unzip -q $ALPHA.zip
echo "$ALPHA.zip is unzipped"
cd ..
rm -rf $ALPHA.bak
#fails on landkey: if [ -d "../$ALPHA"  ]; then mv -f "../$ALPHA" "../$ALPHA.bak"; fi
if [ -d "$ALPHA"  ]; then
   mv -f $ALPHA $ALPHA.bak
fi
mv -f  w/$ALPHA .
echo "current dir is ="
pwd
echo "$ALPHA is moved to current dir"
END_OF_MY_COMMANDS



echo "... remote job done ... working locally ..."
rm -f $ALPHA.zip # clean up
#pwd






exit







#the only way? to concatenate two vars?
WW="_pubed_to_$ALPHA"
WWTARGET="$PROJECT_FOLDER_NAME$WW"
WWTARGETZIP="$WWTARGET.zip"
if [ -d "$PROJECT_ROOT"  ]; then
	echo "... archiving $PROJECT_ROOT to $WWTARGETZIP"
	cd $PROJECT_PARENT_PATH
	if [ -f "$WWTARGETZIP"  ]; then
		echo "... removing $WWTARGETZIP"
		rm -f "$WWTARGETZIP"
	fi
	zip -r -q $WWTARGET $PROJECT_FOLDER_NAME
	echo "archived: $WWTARGETZIP"
fi


#help:
#generic bash: http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html#toc6
#http://stackoverflow.com/questions/4412238/whats-the-cleanest-way-to-ssh-and-run-multiple-commands-in-bash
#http://tldp.org/LDP/abs/html/here-docs.html

#http://www.linuxquestions.org/questions/linux-newbie-8/passing-commands-through-an-ssh-shell-in-a-bash-script-817072/
#cat commands.txt | while read y; do echo $( ssh user@host.host "sudo $y" & )  ; done
#ssh user@host.host < commands.txt
#bash in one line: http://stackoverflow.com/questions/1289026/syntax-for-a-single-line-bash-infinite-while-loop
#bash in one line: http://ubuntuforums.org/showthread.php?t=1375725

#zombie process: http://www.cyberciti.biz/tips/killing-zombie-process.html

