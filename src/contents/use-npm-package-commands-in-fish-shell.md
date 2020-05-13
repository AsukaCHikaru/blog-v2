---
author: asukachikaru
date: 2020-04-20
title: 'Use npm package commands in fish shell'
path: /post/use-npm-package-commands-in-fish-shell
tags: fish, npm, terminal
category: programming
---

## TL;DR:
Add `set -x PATH {your npm path} node_modules/.bin $PATH` to `~/.config/fish/config.fish`.

## Global package

To use globally installed npm packages' commands, you have to add .bin directory to path. 
The command is `set -x PATH {your npm path} $PATH`, which means set a variable to name PATH, with value `{your path}` and current value $PATH. Space between values works like an add.  

You can type this command in terminal or create a file `~/.config/fish/config.fish` and save the command in it. Fish runs this config file automatically when launching.  

To check your npm path, use `npm config get prefix`.

## Local package

The above fix only works for globally installed packages.  

Binary files for local packages exist in every project folders, but it seems hugely inefficient to add EVERY folder to the path. Fortunately, the path variable supports relative entries, so we only have to add one path, which is `node_modules/.bin`.  

The command will be like `set -x PATH node_modules/.bin $PATH`.