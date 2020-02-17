const inquirer = require("inquirer");
const fs = require("fs");

const CONTENT_PATH = `src/contents/`
const argv = process.argv.slice(2).join(" ");
const date = new Date().toLocaleDateString("ja-JP").replace(/\//g, "-");

const postMetaData = {
  date: date,
  title: argv,
  path: argv.toLowerCase().replace(/\s/g, "-"),
  tags: [],
  catgory: undefined
};

const run = async () => {
  await inquirer
    .prompt([
      {
        type: "list",
        name: "category",
        message: "Select post category:",
        choices: ["Gaming", "Programming", "Others"]
      }
    ])
    .then(ans => {
      postMetaData.catgory = ans.category.toLowerCase();
    });

  let tagOver = false;
  while (!tagOver) {
    await inquirer
      .prompt([
        {
          type: "input",
          name: "tag",
          message: `Enter tags (enter to end): [${postMetaData.tags.join(", ")}]`
        }
      ])
      .then(ans => {
        if (ans.tag !== "") postMetaData.tags.push(ans.tag.split(/,\s*/));
        else tagOver = true;
      });
  }
  console.log(postMetaData);

  fs.writeFileSync(
    `${CONTENT_PATH}${postMetaData.path}.md`,
    `---
date: ${postMetaData.date}
title: ${postMetaData.title}
path: ${postMetaData.path}
tags: ${postMetaData.tags.join(", ")}
category: ${postMetaData.catgory}
---

`
  );
};

run();
