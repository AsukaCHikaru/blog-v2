---
author: asukachikaru
date: 2019-05-23
title: 'A rather easy way to implement quicksort in JavaScript'
path: /a-rather-easy-way-to-implement-quicksort-in-js
tags: JavaScript, algorithm
category: programming
---

Don't use in-place swap.

Declare 2 new array `left` and `right` (or anything you want to call them).<br>
After comparing each element to pivot, push it to `left` if it's smaller or `right` if it's bigger than pivot.<br>
Then `return [...quickSort(left), pivot, ...quickSort(right)]` will do the magic.

Of course it's not as good space efficiency-wise, but it's way easier to implement and understand.

Example code:

```
function quickSort(arr){
  if(arr.length <= 1) return arr;
  else {
    let pivot = arr.pop();
    let len = arr.length;
    let left = [];
    let right = [];
    for(let i = 0; i < len; i++){
      if(arr[i] >= pivot) right.push(arr[i]);
      else left.push(arr[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
}
```
