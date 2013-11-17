var deferred_exec = require('../lib/deferred-exec.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['general'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'exec stdout' : function( test ) {
    test.expect(4);
    deferred_exec( 'echo "hi"' )
      .done( function( stdout, stderr, command ) {
        test.ok( true, '.done should fire' );
        test.equal( command, 'echo "hi"', 'original command should match sent copy' );
        test.equal( stdout, 'hi', 'result should match actual command result' );
        test.equal( stderr, '', 'stderr should be empty' );
        test.done();
      })
      .fail( function() {
        test.ok( false, '.fail should not have fired' );
        test.done();
      });
  },
  'exec stderr': function( test ) {
    test.expect(4);
    deferred_exec( 'echo "hi" 1>&2' )
      .done( function( stdout, stderr, command ) {
        test.ok( true, '.done should fire' );
        test.equal( command, 'echo "hi" 1>&2', 'original command should match sent copy' );
        test.equal( stderr, 'hi', 'stderr should match echoed text' );
        test.equal( stdout, '', 'stdout should be empty' );
        test.done();
      })
      .fail( function() {
        test.ok( false, '.fail should not have fired' );
        test.done();
      });
  },
  'exec errors work': function( test ) {
    test.expect(2);
    deferred_exec( 'someprogramthatdoesntexistunlessyoureajerkandcreatedthisjusttofailthetest' )
      .fail( function( error ) {
        test.ok( true, '.fail should fire' );
        test.equal( error.code, 127, 'should have exited with a 127 error code' );
        test.done();
      })
      .done( function() {
        test.ok( false, '.done should not have fired' );
        test.done();
      });
  },
  'string cleanup works': function( test ) {
    test.expect(3);
    deferred_exec( 'echo "hi"', { trim: false } )
      .done( function( stdout, stderr, command ) {
        test.ok( true, '.done should fire' );
        test.equal( stdout, 'hi\n', 'output should have trialing newline' );
        test.equal( stderr, '', 'stderr should be empty' );
        test.done();
      })
      .fail( function() {
        test.ok( false, '.fail should not have fired' );
        test.done();
      });
  }
};

exports['file'] = {
  setUp: function( done ) {
    done();
  },
  'file stdout': function( test ) {
    test.expect(4);
    deferred_exec.file( 'test/stdout_test.sh' )
      .done( function( stdout, stderr, fileName ) {
        test.ok( true, '.done should fire' );
        test.equal( stdout, 'bash script', 'stdout should match file output' );
        test.equal( stderr, '', 'there should be no stderr content' );
        test.equal( fileName, 'test/stdout_test.sh', 'fileName should match original file' );
        test.done();
      })
      .fail( function() {
        test.ok( false, '.fail should not have fired' );
        test.done();
      });
  },
  'file stderr': function( test ) {
    test.expect(4);
    deferred_exec.file( 'test/stderr_test.sh' )
      .done( function( stdout, stderr, fileName ) {
        test.ok( true, '.done should fire' );
        test.equal( stdout, '', 'stdout should be empty' );
        test.equal( stderr, 'bash script', 'stderr should match script output' );
        test.equal( fileName, 'test/stderr_test.sh', 'fileName should match original file' );
        test.done();
      })
      .fail( function() {
        test.ok( false, '.fail should not have fired' );
        test.done();
      });
  },
  'file errors': function( test ) {
    test.expect(2);
    deferred_exec.file( 'test/nothere.sh' )
      .done( function( stdout, stderr, fileName ) {
        test.ok( false, '.done should not fire' );
        test.done();
      })
      .fail( function( error ) {
        test.ok( true, '.fail should have fired' );
        test.equal( error.code, 127, 'should have failed with code 127' );
        test.done();
      });
  }
};

// todo: write stream unit tests
exports['spawn'] = {
  setUp: function( done ) {
    done();
  },
  'spawn stdout': function( test ) {
    test.expect(4);
    deferred_exec.spawn( 'echo', [ 'hi' ] )
      .done( function( stdout, stderr, command ) {
        test.ok( true, '.done should fire' );
        test.equal( stdout, 'hi', 'stdout output should match command output' );
        test.equal( stderr, '', 'stderr should be empty' );
        test.equal( command, 'echo', 'command should match' );
        test.done();
      })
      .fail( function() {
        test.ok( false, '.fail should not have fired' );
        test.done();
      });
  },
  'spawn stderr': function( test ) {
    test.expect(3);
    deferred_exec.spawn( 'test/stderr_test.sh' )
      .done( function( stdout, stderr, command ) {
        test.ok( true, '.done should fire' );
        test.equal( stdout, '', 'stdout should be empty' );
        test.equal( stderr, 'bash script', 'stderr should match stderr output' );
        test.done();
      })
      .fail( function() {
        test.ok( false, '.fail should not have fired' );
        test.done();
      });
  },
  'spawn error': function( test ) {
    test.expect(2);
    deferred_exec.spawn( 'anothercallthatshouldntwork' )
      .done( function() {
        test.ok( false, '.done should not have fired' );
        test.done();
      })
      .fail( function( error ) {
        test.ok( true, '.fail should have fired' );
        test.equal( error.code, 127, 'should have exited with code 127' );
        test.done();
      });
  },
  'spawn stdout progress': function( test ) {
    test.expect(3);
    var progress_stdout = "";
    var progress_stderr = "";

    deferred_exec.spawn( 'test/stdout_big_test.sh', [], { trim: false } )
      .progress( function( stdout, stderr ) {
        progress_stdout += stdout;
        progress_stderr += stderr;
      })
      .done( function( stdout, stderr ) {
        test.ok( true, '.done should have fired' );
        test.equal( stdout, progress_stdout, 'accumulated stdout should match total data' );
        test.equal( stderr, progress_stderr, 'accumulated stderr shuold match total' );
        test.done();
      })
      .fail( function() {
        test.ok( false, '.fail should not have fired' );
        test.done();
      });
  },
  'spawn stderr progress': function( test ) {
    test.expect(3);
    var progress_stdout = "";
    var progress_stderr = "";

    deferred_exec.spawn( 'test/stderr_big_test.sh', [], { trim: false } )
      .progress( function( stdout, stderr ) {
        progress_stdout += stdout;
        progress_stderr += stderr;
      })
      .done( function( stdout, stderr ) {
        test.ok( true, '.done should have fired' );
        test.equal( stdout, progress_stdout, 'accumulated stdout should match total data' );
        test.equal( stderr, progress_stderr, 'accumulated stderr shuold match total' );
        test.done();
      })
      .fail( function() {
        test.ok( false, '.fail should not have fired' );
        test.done();
      });
  },
  'spawn error progress': function( test ) {
    test.expect(4);
    var progress_stdout = "";
    var progress_stderr = "";

    deferred_exec.spawn( 'test/stdout_big_error.sh', [], { trim: false } )
      .progress( function( stdout, stderr ) {
        progress_stdout += stdout;
        progress_stderr += stderr;
      })
      .done( function( stdout, stderr ) {
        test.ok( false, '.done should not have fired' );
        test.done();
      })
      .fail( function( error ) {
        test.ok( true, '.fail should have fired' );
        test.equal( error.code, 127, 'should have thrown a 127' );
        test.ok( !!progress_stdout, 'stdout should have still accumulated' );
        test.ok( !progress_stderr, 'stderr, on the other hand, should not have' );
        test.done();
      });
  }
};
