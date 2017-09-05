[![Stories in Ready](https://badge.waffle.io/Stratio/egeo.svg?label=ready&title=Ready)](http://waffle.io/Stratio/egeo)
[![Coverage Status](https://coveralls.io/repos/github/Stratio/egeo/badge.svg?branch=karma-config)](https://coveralls.io/github/Stratio/egeo?branch=karma-config)

<div align="center">
<img src="https://stratio.github.io/egeo-web/2.1.0/assets/images/egeo_logo.png">
</div>

# Egeo

EGEO is the open-source component library used to build Stratio's UI. The goals are to reduce the time and complexity of interface building being more productive, improving the experience based in apply the same patterns and visuals across the whole Stratio applications being more consistent, and create a common and unified visual language that helps us to understand each other better laying the foundation for scalable growth.

In this repository, you'll find UI components, services and utilities but this is only one part of the project. You can discover more in:

* [egeo-web](https://github.com/Stratio/egeo-web): The official website of Egeo where documentation will be available soon.
* [egeo-ui-base](https://github.com/Stratio/egeo-ui-base): A Sass library that helps us to build our styles, including a rewritten Sass version of [flexboxgrid](http://flexboxgrid.com/).
* [egeo-theme](https://github.com/Stratio/egeo-theme): The egeo components are thematizable. This is the official theme used in the Stratio's applications.
* [egeo-starter](https://github.com/Stratio/egeo-starter): A Boilerplate project prepared for work with Egeo 2.x, Angular 4.x, TypeScript, Webpack, Karma, Jasmine and Sass.

## Table of contents

* [About this repo](#about-this-repo)
* [Getting Started](#getting-started)
   * [Dependencies](#dependencies)
   * [Installing](#installing)
   * [Work with the code](#work-with-the-code)
   * [How to run](#how-to-run)
   * [How to test](#how-to-test)
   * [How to build](#how-to-build)
* [Contributing](#contributing)
* [License](#license)

## About this Repo

This repo includes the components, services, and utilities built in Angular. The library is compiled with AoT for distribution and each component is provided as a module that can be imported separately in your project.

* Documentation website (soon)

## Getting Started

### Dependencies

What you need to run this app:
* [`node`](https://nodejs.org/es/) and `npm`
* Ensure you're running the latest versions Node `v6.x.x` and NPM `4.x.x`+

What your app will need to work with Egeo:
* angular/common ~4.2.0",
* angular/core ~4.2.0",
* angular/forms ~4.2.0",
* angular/http ~4.2.0",
* angular/platform-browser-dynamic ~4.2.0",
* angular/Router ~3.4.6

### Installing

You can install Egeo from npm:

```
npm i @stratio/egeo
```

### Work with the code

You can use Npm or Yarn to work with Egeo. If you want to use Yarn, it has to be installed first as a global dependency in your local machine.

```
sudo npm i -g yarn
```

Once Yarn is installed or Npm is ready, you can install Egeo using:

```
yarn
```

or

```
npm install
```

### How to Run

To run egeo locally you must use this commands.

```
yarn start
```

or

```
npm run start
```

### How to Test

There is a command to start the karma server and launch the whole tests written for the librery.

```
yarn test
```

or

```
npm run test
```

It is possible to run an individual test to avoid run the whole suite.

```
npm run test -- -- st-two-list
```

### How to Build

If you want to build a distributable package you must use the `build` command. This will create a **target** folder with the distributable code of the package.

```
yarn build
```

or

```
npm run build
```

## Contributing

There are many ways to contribute to the Egeo project. [Check our contribution section in the Wiki to learn more](https://github.com/Stratio/egeo/wiki/How-to-contribute).

## License

Egeo is distributed under the Apache 2 license. You may obtain a copy of the license here at:

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)
