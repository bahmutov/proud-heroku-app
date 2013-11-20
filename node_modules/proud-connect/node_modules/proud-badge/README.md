# proud-badge v0.0.4

> Badge generation for NPM downloads by author

[![NPM][proud-badge-icon]][proud-badge-url]

[![Build status][proud-badge-ci-image]][proud-badge-ci-url]
[![dependencies][proud-badge-dependencies-image]][proud-badge-dependencies-url]
[![devdependencies][proud-badge-devdependencies-image]][proud-badge-devdependencies-url]

[![endorse][endorse-image]][endorse-url]

[proud-badge-icon]: https://nodei.co/npm/proud-badge.png?downloads=true
[proud-badge-url]: https://npmjs.org/package/proud-badge
[proud-badge-ci-image]: https://travis-ci.org/bahmutov/proud-badge.png?branch=master
[proud-badge-ci-url]: https://travis-ci.org/bahmutov/proud-badge
[proud-badge-dependencies-image]: https://david-dm.org/bahmutov/proud-badge.png
[proud-badge-dependencies-url]: https://david-dm.org/bahmutov/proud-badge
[proud-badge-devdependencies-image]: https://david-dm.org/bahmutov/proud-badge/dev-status.png
[proud-badge-devdependencies-url]: https://david-dm.org/bahmutov/proud-badge#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov



## Use

install:

```
npm install proud-badge
```

use:

```javascript
var genBadge = require('proud-badge');
genBadge(username).then(function (badgeFilename) {
    // use image file
});
```



### Related

* [proud](https://github.com/bahmutov/proud) fetches downloads numbers
* [proud-connect](https://github.com/bahmutov/proud-connect) is a stand alone
server generating badges with caching
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

  * returning default badge, fixes #9

0.0.3 / 2013-11-19
==================

  * added e2e testing, fixes #6, fixed travis build fixes #7

0.0.2 / 2013-11-19
==================

  * travis build
  * added pre-git, fixes #8
  * Added grunt, fixes #4, fixes #5

0.0.1 / 2013-11-13
==================

  * using from external module, fixes #3

0.0.0 / 2013-11-13
==================

  * initial badge creation


