# deferred-exec

Deferred based tool to run exec commands. Lets you use exec, execFile and spawn in a sane way.

Version: 0.3.1

## Installing

Install the module with: `npm install deferred-exec` or add it to your project's `package.json` file.

You can also clone this repo and `npm install folderOfClonedRepo` to get a branch or development copy.

## Using

All calls return a promise, which means it's easy to do stuff when they complete or fail:

```javascript
var dexec = require( 'deferred-exec' );

dexec( 'echo "yay"' )
  .done( function( stdout, stderr, command ) {
    console.log( stdout ); // logs "yay"
  })
  .fail( function( error ) {
    console.log( "it didn't work :( got code:", error.code );
  });
```

Since they are deferreds, you can pass them around in your code:

```javascript
var dexec = require( 'deferred-exec' );

var command = dexec( 'echo "gotcha"' );

doSomethingWithCommand( command );

// meanwhile, in some other part of your application
function doSomethingWithCommand( command ) {
  command.done( function( stdout, stderr, command ) {
    console.log( 'just ran', command, 'and got', stdout );
  });
}
```

Use [Underscore.Deferred](https://github.com/wookiehangover/underscore.deferred) if you want to use
`_.when` to group multiple commands. (Note: you can use underscore.deferred with [lodash](https://github.com/bestiejs/lodash))

```javascript
var dexec = require( 'deferred-exec' );

// require and mixin lodash with _.deferred
var _ = require( 'lodash' );
_.mixin( require( 'underscore.deferred' ) );

var commandA = dexec( 'ls /etc' );
var commandB = dexec( 'echo "hi"' );

// when both commands succeed
_.when( commandA, commandB )
  .done( function( a, b ){
    console.log( 'commandA output:', a[0] );
    console.log( 'commandB output:', b[0] );
  });
```

Or run a file using `.file` 

```javascript
var dexec = require( 'deferred-exec' );

dexec.file( './someFile.sh' )
  .done( function( stdout, stderr, fileName ) {
    console.log( 'ran', fileName, 'got', stdout );
  });
```

Or take advantage of spawning a new progress and getting its output during execution:

```javascript
var dexec = require( 'deferred-exec' );

dexec.spawn( 'cat', [ '/var/log/syslog' ] )
  .progress( function( stdout, stderr, command ) {
    /* this function will get called with every piece of 
       data from the returne result */
   })
   .done( function( stdout, stderr, command ) {
     /* all done! total value's available of course */
   });
```
  

## Reference

For `deferred-exec` details see [child_process.exec](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) for available options

For `deferred-exec.file` details see [child_process.execFile](http://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback)
for available options

For `deferred-exec.spawn` details see [child_progress.spawn](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) for available options

## Options

All methods support an options object. `deferred-exec` adds two possible options to this object:

#### trim

This defaults to `true`, which trims the last bit of trailing while space (a new line) from the output.
Set to `false` if you don't want your final output trimmed.

#### encoding

The default is `utf8`, so if you want one of the other types supported you can specify it here.

## API Quick Reference

Assuming `var dexec = require( 'deferred-exec' ):

#### dexec( _String_ command, _Object_ options )

#### dexec.execFile( _String_ filename, _Array_ arguments, _Object_ options )

#### dexec.spawn( _String_ command, _Array_ arguments, _Object_ options )

All methods return a promise. Check out the [Deferred Documentation](http://api.jquery.com/category/deferred-object/). 
Only `.spawn` utilizes the `notify()` method.


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## License
Copyright (c) 2012 Dan Heberden  
Licensed under the MIT license.
