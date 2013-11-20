# proud-connect v0.0.4

> Connect server generating NPM downloads badges by author

[![NPM][proud-connect-icon]][proud-connect-url]

[![Build status][proud-connect-ci-image]][proud-connect-ci-url]
[![dependencies][proud-connect-dependencies-image]][proud-connect-dependencies-url]
[![devdependencies][proud-connect-devdependencies-image]][proud-connect-devdependencies-url]

[![endorse][endorse-image]][endorse-url]

[proud-connect-icon]: https://nodei.co/npm/proud-connect.png?downloads=true
[proud-connect-url]: https://npmjs.org/package/proud-connect
[proud-connect-ci-image]: https://travis-ci.org/bahmutov/proud-connect.png?branch=master
[proud-connect-ci-url]: https://travis-ci.org/bahmutov/proud-connect
[proud-connect-dependencies-image]: https://david-dm.org/bahmutov/proud-connect.png
[proud-connect-dependencies-url]: https://david-dm.org/bahmutov/proud-connect
[proud-connect-devdependencies-image]: https://david-dm.org/bahmutov/proud-connect/dev-status.png
[proud-connect-devdependencies-url]: https://david-dm.org/bahmutov/proud-connect#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov



## Use

```
npm install
node index.js
```

Badge / json information can be fetched `http://localhost:3000/username

#### Using the deployed Heroku app

![bahmutov badge](http://proud.herokuapp.com/bahmutov)

Use Markdown:

    ![bahmutov badge](http://proud.herokuapp.com/bahmutov)

Or HTML:

    <img src="http://proud.herokuapp.com/bahmutov"></img>

to generate number of total NPM downloads in the last month.



### Related

* [proud](https://github.com/bahmutov/proud) is a stand alone CLI tool
* [proud-badge](https://github.com/bahmutov/proud-badge) generates badges
* [proud-heroku-app](https://github.com/bahmutov/proud-heroku-app) is
a *proud-connect* service [running on Heroku](http://proud.herokuapp.com/)

## Why?

Because one should be **proud** of his work.

### Small print

Author: Gleb Bahmutov &copy; 2013

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, click *endorse*, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github



## History


0.0.4 / 2013-11-19
==================

  * default image for unknown user, fixes #6
  * added expires header, fixes #4

0.0.3 / 2013-11-17
==================

  * you can pass desired format as /username/png or /username/json fixes #8
  * added unit tests
  * added travis file
  * added test as pre-commit
  * added simple sanity test

0.0.2 / 2013-11-17
==================

  * using grunt and grunt-readme, fixes #9, #10, #11
  * fixed concurrent problem

0.0.1 / 2013-11-13
==================

  * images older than day will be regenerated
  * returning badge and keeping it in memory
  * working badge return or text, depending on request


