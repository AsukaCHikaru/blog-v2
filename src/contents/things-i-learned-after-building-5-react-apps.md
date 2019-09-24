---
author: asukachikaru
date: 2019-08-08
title: 'Things I learned after building 5 React.js apps'
path: /things-i-learned-after-building-5-react-apps
tags: JavaScript, React.js
category: programming
---

### TLDR:

- Use [Create-React-App](https://facebook.github.io/create-react-app/)
- Read the [doc](https://facebook.github.io/create-react-app/docs/getting-started)
- Look source code of proven React-based apps

So since I began learning React.js, I've built about 5 or 6 apps using it. I will say, during the starting of my time with React, I struggled a lot. To understand React, I have to have basic knowledge of, for example, the concept of Webpack (and the overwhelming config docs), virtual dom, JSX, state machine... all were new things to me. Fortunately, I got some advice from seniors, then I felt like I was finally on the right way of learning React for the first time. Through this article, I hope to help people in similar situations.

## For a beginner, Create-React-App solves a lot of problems.

The advice I mentioned earlier was "Just use [Create-React-App](https://facebook.github.io/create-react-app/)".<br>

Yeah, just like that. <br>

So the most difficult and overwhelming part for me was all the Webpack configurations. Create-React-App takes care most of them, making developers only have to worry about React itself. So if you're lost in those manuals even before writing one line of React, try to start using Create-React-App.

## I know I don't have to repeat it, but read the doc.

The way to build visual parts of an app using React differs a lot from the traditional DOM manipulation way. Thinking, or coding in the old way may make your app unable to run -- or worse, your app will still work, and you won't notice the mistake or improvable parts. I'll suggest reading the doc to at least understand below things:

- [map](https://reactjs.org/docs/lists-and-keys.html) (render similar nodes using loops)
- [component life cycle](https://reactjs.org/docs/state-and-lifecycle.html) (you're probably going to use willMount/ didMount events)
- [bind value to state](https://reactjs.org/docs/forms.html) (when using every type of input)

## And there're still some other stuff people often use that are not there.

Your React app will work just fine with itself only. Then when you start to bring your standard and level by comparing your code and some proven applications (I recommend realworld), you'll find many things, including functions or libraries, that Create-React-App didn't provide. And some of these may be considered almost necessary. It is likely to lose track of those things while start getting used to components, props, and states, and having a good feeling about yourself. My checklist will be:

- [prop-types](https://github.com/facebook/prop-types)
- [defaultProps](https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values)
- [redux](https://redux.js.org/) (optional, but better to know its existence and concept)

---

Above are very beginner advice, but these were the things I did struggle and spent relatively more time to figure out by myself. So I write this to record it and hopefully help some people.
