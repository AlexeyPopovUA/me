# Impact of React 19 and its new compiler on the performance of web apps

## Preface

Performance is a thing
Lets take typical react components compositions.
Let's see how we used to minimize the re-rendering jobs.
Let's see what React 19 and the new compiler offers

## When do React components re-render?

Reasons
Diagrams
Select our structures for the demo app
Diagram with pages

## TLDR

Just give me the links!
GitHub
Hosted version with React 18
Hosted version with React 19

## Demo application

Explain the stack of the demo web application. Next.js 14.+, React 18.+.
Explain typical page structure
Component composition situations on every page
Mention setup with Next.js 15.+ and React 19 RC for comparison.

## Re-rendering of sibling components

Screenshot
Code snippet
Rendering screenshot from React DevTools Profiler for React 18
Explain
Rendering screenshot from React DevTools Profiler for React 19
Explain the difference

## Caching properties

Screenshot
Code snippet
Rendering screenshot from React DevTools Profiler for React 18
Explain
Rendering screenshot from React DevTools Profiler for React 19
Explain the difference

## Caching callbacks

Screenshot
Code snippet
Rendering screenshot from React DevTools Profiler for React 18
Explain
Rendering screenshot from React DevTools Profiler for React 19
Explain the difference

## Components as properties

Screenshot
Code snippet
Rendering screenshot from React DevTools Profiler for React 18
Explain
Rendering screenshot from React DevTools Profiler for React 19
Explain the difference

## Why React 19 with the new compiler are so good?

Auto-wrapping with `memo`
Internal component caching
Compiled component is transformed, so all callbacks are defined once for all rendering calls

## Conclusions

We reviewed several component compositions and ways to minimize the rendering jobs.
We checked the impact of React 19 and the new compiler on rendering performance.
What can we get rid of when updating?