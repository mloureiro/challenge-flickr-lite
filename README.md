# flickr

This is a technical challenge for a position, the details are in the [assignment](./ASSIGNMENT.md) document.


### Overview

I've done a simple SPA, with a simple search component that displays the photos in a gallery. The assignment isn't complex, so I've attempted to make a better structured and code split to emulate a bigger/corporate projects, in the end this could (probably) be achieved with a single JS file with a few hundred lines.

Since there was no time constraint besides the week interval, initially I thought of doing it within 4 hours (which is common on this kind of assignments), although I went way over the 4 hours. This because I took time to dive deeper into some other topics (like Webpack), and I also to understand Flickr API, as I wanted to show the contents of their landing page, in the end I didn't figure it out, either that service doesn't exist, or I simply missed it.


#### Features worth mention

Theme - components are styled according to a global theme (in [`index.css](./src/index.css))

UI component system - I've created a simple helper to generate DOM elements and on top of that I added the project components, these behave in the same way, they return the DOM node as the `element` key, any possible state change actions alongside with it, and all the components are extensible by their parents (including that component wrappers don't have margins so that their parent can align them without an issue).

Concurrency issues - this would be hard to simulate as the API is blazing fast and the UI shouldn't allow this to happen, the only way this could happen is by clicking load more and quickly making a new search. So the gallery is never overwritten with old photos.

Commits - this is not a feature, but I think it's worth mentioning, I've kept the commits atomic and isolated, so that it is easier to read the history and understand why certain code was changed.


#### Possible improvements

Tests - I've prepared most components in a way that is easy to do unit tests (without having to resort to mocks), only [`home.js`](./src/pages/home/home.js) would be the hardest, but it being a controller, the ideally would be to use UI tests (using Cypress or something similar)

Declarative components - currently components return the DOM node as `element`, and the possible actions to change the inner state. The state isn't changed directly, but it is still required to "tell" the component to change to loading state (example), this is called the imperative paradigm, although this is a very common practice, declarative paradigm as proven less prone to bugs.

UI - the UI sucks, it is responsive, but not many changes besides a handful of things. I can implement the layout based on a mock up, but my creative skills aren't the best.

Gallery - now it only shows the found image, I've fetched some other information (like author or title) I found relevant, and it would be nice to have an overlay on the bottom of the images with them.

Storage - as it is, the data loaded from the API is injected into the DOM and that's pretty much it, we could move this data into a component to store/cache results (for instance in local storage).

Production ready Webpack configuration - I took some time to dive into Webpack to make a development setup, as I normally just rely on the framework builds, but it would be best to make a production ready with all the possible optimizations and none of the debugging features.

Infinite scroll - I intended on building it, that's why I added the "load more" button in the bottom of the gallery.

> **Note**: I've left comments in the code prefixed with `@TODO` for things that crossed my mind but skipped for later.


#### Project structure

`lib/` - contains libraries that could be extracted outside of the project

`lib/dom` - simple helper to generate DOM nodes in a JS way, this could be improved to include validations/constraints (ex: invalid tags, required or invalid properties), also it would be helpful to include a helper to attach events.

`lib/flickr` - instead of accessing directly flickr API within the project, I've extracted it into an SDK/port so that if the API changes it is done in a single place. Due to have an internal API to access flickr API it also makes it possible to replace flickr with other API without touching the project.

`src/` - core logic for the project, while `lib/` modules could be used on other projects, the contents of `src/` should be project specific (except for some components under `src/ui/components`)

`src/pages/` - contain the main component for each page (currently I only have Home page), these components should contain only business logic to handle the pages (like the controllers in MVC pattern)

`src/ui/` - here lies all the UI components, contrary to `src/pages/`, all components here are either UI, control UI properties or both, so business logic shouldn't exist within this namespace
