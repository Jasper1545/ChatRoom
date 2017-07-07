var Util = require("./util");

var table_0 = {};
var table_1 = {a:1,b:2};
var table_2 = {a:1,b:2};//tableList
var table = {'table_1':table_1,'table_2':table_2};//User
var table_3 = {'table':table};//UserList

var data = Util.packData(table);
console.log(data);
var o = Util.openData(data);

console.log(Util.sizeOf(table_3));



