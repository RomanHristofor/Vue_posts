# Posts Project

I present to you the **"Posts"** project - an interface for managing posts, built on a modular architecture and reactive approach.

## Technologies

The foundation of the project includes:

- **Vue.js** and **Vuex** technologies for creating components and managing state.
- The **vue-class-component** library provides class syntax.
- **vue-router** for handling routing.

## Features

The application supports basic CRUD operations for posts:

- **Creating** new posts with a title, text, and image.
- **Displaying** a list of all posts and a single post.
- **Editing** and **deleting** existing items.

## Structure

The component structure allows for easy scaling and functional expansion. Data storage is carried out in the Vuex store, with actions/mutations for working with it.

## Design

The design is maximally simplified to focus on functionality.

## Code Quality

Code quality is ensured by **ESLint** and **Prettier**.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
