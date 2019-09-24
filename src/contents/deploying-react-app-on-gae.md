---
author: asukachikaru
date: 2019-09-09
title: 'Deploying React.js app on GAE'
path: /deploying-react-app-on-gae
tags: React.js, GAE
category: programming
---

For people like me who have only used a static host like Amazon S3 before, deploying React app on Google App Engine is a challenge. For all the references I found it looks straightforward and easy to deploy a React app, yet I still struggled for 2 days. Here is how I did it, with the things I realized by logs and tries and errors.

## GAE is not a static host; it's a virtual machine

So you can't just push the build. You have to serve it, like starting a development server. So the next problem is, how?

## With default config, GAE only executes two scripts when deploying

They are `npm install` and `npm start`.

Like I mentioned before, for merely starting a server for React, these two seems enough. Then I found out it's not, because default `npm start` provided by Create-React-App, which equals to `node scripts/start.js` if you check out `package.json`, takes much time, and it's long enough to make the app not working. So we need a faster way to *serve* it.

## Serve can do the trick

Literally, [serve](https://github.com/zeit/serve).

Notice serve needs static files to run, so we need to build it first. Since GAE only runs two scripts, and building takes some time too, so I bound it to `postinstall` instead of `prestart` . By this way, GAE automatically builds right after it installs dependencies.

You can also use some host framework (like [express](https://github.com/expressjs/express)) to do the hosting and routing stuff too.

## Config the port

React development server default port is 3000, and serve's is 5000, while GAE uses 8080.

The scripts in `package.json` I used when finally successfully deployed looks like this:

    "script": {
      "postinstall": "npm run build",
      "start": "serve -l 8080 -s build"
    }

You need to configure app.yaml too, but I think there are many resources talking about how to do it.

I hope this helps!
