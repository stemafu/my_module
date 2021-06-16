//include express
var express = require('express');
let bodyParser = require('body-parser');
//include the node postgres library
var {Pool, Client} = require('pg');


//create an express application
var app = express();
app.use(bodyParser.urlencoded({extended: false}));

const pool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'Password',
        port:'5432'
    }
);

/*
pool.query('select now()', (err, res) => {
    console.log(err, res);
    pool.end();
}); 
*/


// Connection URI
//const connectionString = "postgresql://postgres:Password@localhost:5432/postgres";

/*const pool = new Pool({
    connectionString,
  })
  
//console.log(pool);

pool.query('select now()', (err, res) => {
    console.log(err, res);
    pool.end();
});
console.log("Test again");
console.log("Test again");
console.log("Test again");
console.log("Test again");*/
/*-
//connect to a database
pg.connect('postgres://postgres:Password@localhost:5432/postgres', function(err, client, done) {
 //request all of the hats
 client.query(`select * from hats`, function(err, result) {
 console.log(result.rows);
 //let pg know we're done with this client
 done();
 //close the pg pool entirely.
 //this is done so our node process will exit.
 pg.end();
 });
});*/



//define a route on `/hello/world`
app.get('/hello/worlds', function(request, response) {
 console.log('got request for "/hello/world"');
 response.send('hello there and hello there indeed!');
});

app.get('/greeting:name', function(request, response) {
    console.log(`Hello ${request.params.name}`);
    response.send('hello there and hello there indeed!');
});

app.get("/viewAllHats", function(request, response){

    pool.query(`select * from hats`, (err, result) => {


        if(err){
            console.log(err.stack);
        }
        console.log(result.rows.length);

        console.log(result.rows[2])
        //let pg know we're done with this client
        //done();
        //close the pg pool entirely.
        //this is done so our node process will exit.
       // pool.end();
    });

    response.send("View Data done");
});


app.get("/viewHat:id", function(request, response){

    let id = request.params.id;
    console.log("Let us see the Id " + id);
    values = [id];
    
    // pool.query(`select * from hats where id = ${id}`, (err, result) => {
    pool.query(`select * from hats where id = $1}`, values, (err, result) => {
        if(err){
            console.log(err.stack);
        }
        console.log(result.rows);
        //console.log(result.rows[2])
        //let pg know we're done with this client
    }); 
    response.send("View by ID");
});

app.post('/submit-data', function(request, response){
    console.log("Processing some information");

    let firstname = request.body.firstname;
    let lastname = request.body.lastname;
    let email = request.body.email;
    let height = 10;
    let brim = true;
    
    console.log(firstname);
    console.log(lastname);
    console.log(email);

    

    /*In order for us to handle HTTP POST request with our express app, 
    we need to install a middleware module called body parser.

    */

    /* We we capture the information from the form, we want to submit to 
    a database for storage
    */

    let text = 'INSERT INTO hats (name, material, height, brim) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [firstname , lastname , height , brim ];

    
    pool.query(text,values, (err, result) =>{

        if(err){
            console.log(err.stack);
        }

        console.log(result.rows);

    } );

   //pool.end();
    response.send("Post request");
});


app.put('/update-data', function(request, response){
    response.send("Put request");
});


app.delete('/delete-data', function(request, response){
    response.send("Delete request");
});

/*


*/


//have the application listen on a specific port
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});