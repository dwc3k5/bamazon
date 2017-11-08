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
  stock(init);
  //init();
});

function stock(cb){
  connection.query("SELECT * FROM products", function(err, res) {
    for(var i = 0; i<res.length; i++){
      console.log("ID: "+res[i].item_id+" | "+res[i].product_name+" | "+res[i].price+" | "+res[i].stock_quantity);
    }
   cb();
    // console.log("response= "+JSON.stringify(res));
  });
}


// connection.query("SELECT * FROM products", function(err, results){
//   if(err) throw err;
//   console.log(results[0].item_id);
// });


function purchase (){
  inquirer.prompt([
  {
    name:"selection",
    type:"input",
    message:"choose the id of the item you would like to purchase..."
  },
  {
    name:"amount",
    type:"input",
    message:"How many would you like to purchase?"
  }
]).then(function(response){
  var amt;
  var slct = parseInt(response.selection);
  connection.query("SELECT * FROM products", function(err, res) {
    amt = res[slct-1].stock_quantity - response.amount;
  connection.query("UPDATE products SET stock_quantity = ? WHERE item_id= ?", [amt, slct], function(err, res) {
    if (err) throw err;
      // Log all results of the SELECT statement

    //  connection.end();
    });
  });
  //passing the parameters here?!?
}).then(function(){ stock(init);});

}


function init(x){

    inquirer.prompt({
      name:"person",
      type:"list",
      message:"Are you a stocker or buyer?",
      choices:["stocker", "buyer"]
    }).then(function(response){
      if(response.person === "buyer"){
        purchase();
      }else{
        //admin function
      }
    });
}
