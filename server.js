/* ============================================================================
 (c) Copyright 2014 Hewlett-Packard Development Company, L.P.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights to
use, copy, modify, merge,publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
============================================================================ */

// Load the modules needed for the app
var http = require('http');
var util = require('util');
var mysql = require('mysql');

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});

  response.write("\n MySQL with Node.js \n");

  // Use the VCAP_SERVICES environment variable. This variable contains
  // credentials for all services bound to the application. In this case, MySQL
  // is the only bound service.
  var services = process.env.VCAP_SERVICES;

  // Parse the JSON so that we can extract the individual components needed for
  // using MySQL
  services = JSON.parse(services);

  // Since there's only one service, we grab the only node which is for MySQL.
  var credentials = services.mysql[0].credentials;

  // The credentials node has a lot of fields, but we are only concerned with
  // the ones below for this MySQL sample.
  var dbname = credentials.name;
  var hostname = credentials.hostname;
  var user = credentials.user;
  var password = credentials.password;
  var port = credentials.port;

  response.write("\n Connecting to MySQL...");

  // Create a connection to MySQL
  var connection = mysql.createConnection({
    database : dbname,
    host : hostname,
    port : port,
    user : user,
    password : password
  });

  connection.connect();

  response.write("\n Connected to MySQL!");

  // Create a query to be executed against a MySQL database.
  var queryResult = '';
  connection.query('SELECT \"Hello World\" AS result', function(err, rows, fields) {
    if (err) {
      throw err;
    }

    queryResult = rows[0].result;

    response.write("\n Executed \'SELECT \"Hello World\" AS result\' ");
    response.write("\n Result =  " + queryResult);

    // Close the connection
    connection.end(function(err){
      console.log("\n Closing the MySQL connection");
   });

    response.end();
  });

});

// Listen to the port being used by this app. The call to process.env.PORT will
// return the port that has been assigned to the app from the Helion Development
// Platform.
var port = process.env.PORT || 8888;
server.listen(port);

// Print to the terminal
console.log("Server listening to port: " + port);
