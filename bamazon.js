var inquirer = require ("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,

  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
});



function init(){
  inquirer.prompt({
    name:"person",
    type:"list",
    message:"Are you a stocker or buyer?",
    choices:["stocker", "buyer"]
  }).then(function(response){
    if(response.person === "buyer"){

    }else{

    }
  });
}
