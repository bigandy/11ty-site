---
title: 'Automation (my) Solution'
date: 2013-12-04 15:33:46
draft: false
description: ''
tags: ['developing', 'hide']
author: 'Andrew'
---

```
#!/bin/bash


function newSite {
 local appdir="/Applications/XAMPP/htdocs/$1"
 local sourcedir="/Applications/XAMPP/htdocs/source"
 local author="Andrew JD Hudson"
 local themedir="/Applications/XAMPP/htdocs/$1/content/themes/$1"
 local starterTheme="es-theme"
 local httpd\_vhosts="/Applications/XAMPP/etc/extra/httpd-vhosts.conf"
 local git="ssh://git@bitbucket.org/bigandy"

 if \[ ! -d $appdir \]
        then
          mkdir -p $appdir/wp
          mkdir -p $appdir/content/themes/$1

          # Copy Directories
          cp -rf $sourcedir/wp/ $appdir/wp
          cp -rf $sourcedir/$starterTheme/ $appdir/content/themes/$1

          # Copy files
          cp $sourcedir/{wp-config,index}.php $appdir
          cp $sourcedir/source.sublime-project $appdir/$1.sublime-project
          cp $sourcedir/source.sublime-workspace $appdir/$1.sublime-workspace

          # change folder url in sublime-project
          sed -i '' 's/source/'$1'/' $appdir/$1.sublime-project


          # Remove the git repos from the original source folders
          rm -rf $appdir/content/themes/$1/.git/
          rm -rf $appdir/wp/.git/

          # swap %%THEME\_NAME%% with $1 in sass file
          # $appdir/content/themes/$1/sass/style.sass
          sed -i '' 's/Starter Theme/'$1'/' $appdir/content/themes/$1/sass/style.sass

          sed -i '' 's/odo/'$1'/' $appdir/wp-config.php

          # Create the initial stylesheet
          cd $appdir/content/themes/$1 && grunt sass

          if \[ ! $2 \]
            then
              $2 = $1
          fi

          # Git init, add, commit, set origin, push to origin
          cd $appdir/content/themes/$1 && git init && git add -A && git commit -m "initial commit of theme files" && git remote add origin $git/$2.git && git push -u origin --all

          # Add folder and url to httpd-vhosts.conf
          echo '
 ServerName '$1'.local
DocumentRoot "'$appdir'" ' | sudo tee -a $httpd\_vhosts > /dev/null

         # /etc/hosts set up
         sudo sed -ie 's/^127.0.0.1 localhost.\*$/& '$1'.local/g' /etc/hosts

         # restart apache so the above changes to httpd-vhosts.conf will take effect
         sudo apachectl restart

         # Create DB
         # mysql -u root -e "CREATE DATABASE IF NOT EXISTS $1\_db;"; exit;
         #

         # subl $appdir/
         # Open Project in Sublime Text 3
         cd $appdir && subl --project ${1}.sublime-project
          # TODO
          # 1. Plugins - how to compile a list of plugins in a folder, or import from a list? see bulk plugin installer plugin (http://wordpress.org/plugins/bulk-plugin-installation/)
          # 2. Import test DB with all installs from test.sql


        else
          echo "Please choose a name that is not $1"
      fi
 }

 newSite $1 $2
```
