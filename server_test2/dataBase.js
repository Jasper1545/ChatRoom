var us = require('./userSystem')
var util = require('./util');

var userSystem = us.System.new(us.System,us.User);
var name = "1";
var table = {a:1,b:2,c:3};
var table_2 = {c:6,d:2,e:3};
var account = "admin";
var password = "123456";

var account_2 = "jasper";
var password_2 = "456879";

var user = userSystem.logInCheck(account,password);
user.createTable(name,table);
user.updateTable(name,table_2);

userSystem.addUser(account_2,password_2);
var user2 = userSystem.logInCheck(account_2,password_2);
user2.createTable('1',table_2);




var dir = "bbb.txt";
//userSystem.save(dir);


var data = util.readFile(dir);
console.log("------------data:"+ data);
var o = util.openData(data);
console.log("------------------------------------------");
console.log();
for(i in o){
    for(j in o[i]){
        for(k in o[i][j]){
            for(m in o[i][j][k]){
                //console.log(m + ":" + o[i][j][k][m]);
            }
            //console.log(k + ":" + o[i][j][k]);
        }
        //console.log(j + ":" + o[i][j]);
    }
    console.log(i + ":" + o[i]);
}
/*
userSystem.userList = [];


setTimeout(test,3000);

function test(){
    console.log(test);
    userSystem.load(dir);
    var o = userSystem.userList;
    for(i in user) {
        for(j in user[i]) {
            for(k in user[i][j]) {
                for(m in user[i][j][k]){
                    console.log(m + ":" + user[i][j][k][m]);
                }
                console.log(k + ":" + o[i][j][k]);
            }
            console.log(j + ":" + o[i][j]);
        }
        console.log(i + ":" + o[i]);
    }
} 
*/




