## About

Stalfos is an open-source, skeletal front-end development starter kit. It provides you with a solid starting-point for working with HTML, Sass and JavaScript. It also provides tools for working with images, fonts and SVG.

Along with being a useful starter kit, Stalfos is completely modifiable and extendable, which allows you to use it to create a powerful front-end development workflow. 

One reason for this is that the beating heart of Stalfos is [Gulp](http://gulpjs.com/), which provides a modular task based processing system that can be extended as you see fit. Stalfos provides a Gulp setup that will process your front-end assets to a decent production ready standard from the word <del>gulp</del> go!

Out of the box, Stalfos gives you:

- An SCSS based collection of helpers, components and layouts in a modular orientated project structure
- A JavaScript project structure with some little helpers included 
- A [Nunjucks](https://mozilla.github.io/nunjucks/) based HTML template building system 
- Automated SVG processing  

## Getting Started

It's recommended that you use Stalfos as a starting point and not as a traditional framework. 

The most straightforward way to get it running is to:

1. Open your terminal at `{your project directory}`
2. Run the following command: 
    <code>git clone https://github.com/hankchizljaw/stalfos.git stalfos_tmp && mv stalfos_tmp/front-end front-end && rm -rf stalfos_tmp && cd front-end</code>
3. This will clone the latest copy of Stalfos into a `front-end` directory for you. It will then move you to that directory
4. Run `npm install` to install the required dependencies
5. After `npm` has finished installing the dependancies that Stalfos needs, run `gulp serve`. More info about the gulp commands can be found [here](#gulp-commands)
6. Visit `http://localhost:8003` in your browser
7. You should see your *almost* blank start page!

Now you've got yourself the basic kit running, let's delve into it a bit deeper.

<small>**Note**: You can also use [Yarn](https://yarnpkg.com/en/) to work with Stalfos.</small>

Now you've got yourself the basic kit running, let's delve into it a bit deeper with the [Stalfos Docs](https://stalfos.io).



Made with ❤ by [hankchizljaw](https://hankchizljaw.io) and [friends](https://github.com/hankchizljaw/stalfos/graphs/contributors)
