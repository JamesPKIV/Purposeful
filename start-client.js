/** This file adapted from:
* https://github.com/fullstackreact/food-lookup-demo/blob/master/start-client.js
*/

const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'purposeful_app', shell: true };
require('child_process').spawn('npm', args, opts);