---
author: asukachikaru
date: 2019-06-07
title: 'Download progress tool in terminal using Node.JS'
path: /download-progress-tool-in-terminal-using-nodejs
tags: JavaScript, Node.JS
category: programming
---

### TL;DR:

- `fs.stat` for getting file size
- `readline.clearLine`
- `readline.cursorTo(0)`
- `process.stdout.write`
  <br>combine these 3 to update command line instead of printing new line

## Get file size

`fs.stat` returns an object contains several stats of the file from url you're downloading.<br>
[Detailed explanation of fs.stat](https://nodejs.org/api/fs.html#fs_class_fs_stats).<br>
Inside of the object, there is `size` property, which is obviously the size of file, in bytes.

```
let fileSize = 0;
fs.stat('url/to/your/file', (stats)=>{
  fileSize = stats.size;
});
```

## Get current progression

In the response from `https.get` when downloading, track and add up the total length of chunks piped into `fs.writeStream`. This total length devided by file size is the download progression we need.

## Write to terminal, but in same line

`console.log` [implementation](https://nodejs.org/docs/v0.3.1/api/process.html#process.stdout) in Node is actually based on `process.stdout.write`. But since there's a `\n` at end of every `console.log`, new line is printed everytime instead of being updated. Therefore we can't use `console.log`

By combine `readline.clearLine` and `readline.cursorTo(0)`, terminal will erase the last line of currently printed line, then move cursor to the starting position. Then we can use `process.stdout.write` to print out current progress without `\n` in `console.log` implementation that causes changing line.

```
let progress = 0;
let req = https.get('url/to/your/file', (res, err)=>{
  res.on('data', (chunk)=>{
    progress += chunk.length;
    const dlPercentage = ((progress/fileSize)*100).toFixed(2);
    readline.clearLine();
    readline.cursorTo(0);
    process.stdout.write(`Downloading... ${dlPercentage}%`);
  });
});
```
