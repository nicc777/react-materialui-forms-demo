# Demonstration of a React Web App using Material UI forms with react-hook-form

I still consider myself relatively new to front-end development (as of end 2020). All my experience was always more on the back-end and I only occasionally implemented some very basic front-ends when absolutely required. It's fair to say that my front-end expereince was limited to front-end implementations that was just enough for my own use or for a very limited user base. It usually consisted of just plain HTML, minimal to no CSS and very sparse use of JavaScript. Security was usually not a big concern. 

Now in 2020 I started taking front-end development more seriously. I settled on learning React and there are some other projects scattered around my GitHub repo with some React projects. However, this project is special to me as I am finally getting to the point where I think I'm understanding most of the major concepts. I am still a bit unsure of certain implementation best practices and this is what this specific project is for.

I am sharing all my code online as a reference for myself as well as perhaps some help to other individuals on the same journey.

I welcome any suggestion for improvement, especially when it comes to best-practices, patterns etc. For this purpose I propose for now you [open a new issue](https://github.com/nicc777/react-materialui-forms-demo/issues), or [engage in a discussion](https://github.com/nicc777/react-materialui-forms-demo/discussions), or you could also just submit a pull request.

This demonstration was originally based on the blog entry of William Kurniawan titled "_[Building a simple login form with Material UI and React Hook Form](https://www.williamkurniawan.com/blog/building-a-simple-login-form-with-material-ui-and-react-hook-form)_", but it has been heavily modified by now. I still would like to give credit to William as his blog entry was a great help.

I was looking for a simpler way to collect form data using Material UI and sofar this is my favorite. `react-hook-form` eliminates the need to keep form data in state and keeps your codebase light.

This is the second iteration of this project where I added various features on top of the original concept. The new features include:

* A _profile_ page (`UserLandingPage`) which is rendered if a valid JWT access token is present. All calls to a back-end server is simulated.
* The `App` component was modified to display either the `LoginPage` or `UserLandingPage` depending on the JWT Access Token Validation state
* The `LoginPage` component will simulate a service call to the login server. A dummy/test JWT is generated.
* In addition, an incorrect login (invalid credentials) can be simulated by using the password "_thisiswrong_"
* Some UI elements were added to display appropriate error messages
* I used the "new" [React Context](https://reactjs.org/docs/context.html) features with [React Hooks](https://reactjs.org/docs/hooks-intro.html). The implementation was based on [the blog entry](https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/) from Ebenezer Don as an alternative from Redux.
* The JWT Access Token is persisted in the [browsers local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
* Local storage is also used to cache the username. The username will be auto filled the next time the page is visited.
* Add a "_remember me_" option to optionally store the username in the local storage

There are still some enhancement outstanding which I will address in the near future as part of my learning exercise:

* Using the [Storybook](https://storybook.js.org/docs/react/get-started/introduction) features.
* Implement unit tests
* More detailed documentation - perhaps even a tutorial?
* I am considering adding a real back-end for testing purposes. This may be useful to practice some security best practices as well.

## Quick Start

```bash
$ git clone https://github.com/nicc777/react-materialui-forms-demo.git
$ cd react-materialui-forms-demo
$ yarn && yarn start
```

If your browser did not automatically open, navigate to http://localhost:3000 

Enable your browser's development tools and watch the `console` output for some interesting additional info. You can also checkout the values in local storage to see what changes during login and logout processing.

## Project Design Overview

![Design](./docs/images/react-materialui-forms-demo.png)

## Important Links

* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [react-hook-form](https://react-hook-form.com/) ([GitHub](https://github.com/react-hook-form/react-hook-form))

License: [MIT](https://raw.githubusercontent.com/nicc777/react-materialui-forms-demo/main/LICENSE) (_[WikiPedia](https://en.wikipedia.org/wiki/MIT_License)_)
