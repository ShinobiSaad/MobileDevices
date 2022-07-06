# Mobile Devices WebApp

Mobile Devices WebApp is  has been developed for the technical assessment of Precept Health, NZ, which develops and sells Medical Device Integration and Clinical Applications for hospital use.

## Technologies
1) Vue.js 3.2.37
2) Vuex 4.0.0
3) Lang: Javascript
4) CSS: Bootstrap v5.0

All the development was tested on both Firefox and Google Chrome

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
## Development Overview
### Goals

The goals of this project were as such,
1) User authentication
2) View Mobile models
3) Add new model
4) Update existing model information
5) Successfully delete a model. 

Which were successfully delivered by my Web application.

### Component
Functional components were used in this project because In Vue 2, functional components had two primary use cases:

1) As a performance optimization, because they initialized much faster than stateful components
2) To return multiple root nodes

However, in Vue 3, the performance of stateful components has improved to the point that the difference is negligible. In addition, stateful components now also include the ability to return multiple root nodes.

As a result, the only remaining use case for functional components is simple components, such as a component to create a dynamic heading.

### Folder structure
![alt text](https://github.com/[ShinobiSaad]/[MobileDevices]/blob/[main]/public/images/folder_structure.png?raw=true)

The src folder has following folders in order,

1) api

Here resides the file main-api.js where my main URL of the api exists. Every other components and store accesses this file to fetch data. 

2) components

Components have to vue files, Modal.vue and Nav.vue. Modal.vue component are used in views to access Modal for editing data and Nav.vue is used in App.vue globally to access Nav bar which is stylized with Bootstrap v5.0

3) router

In this project vue-router 4.0.3 is used. Vue being a single page application it's router handles all the vue files to access and behave as a single page application even though each page is in different paths.

4) store

Vuex 4.0.0 as state management is used here. Basic authentication of user is handled from here.

5) views 

It consists all the pages that web application routes to. Mobile devices list along with all the CRUD operation is handled from here.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
