var util = require('./util');

var User = {
    account:null,
    password:null,
    tableList:{},
    new(account,password,_User){
        o = {};
        o= util.copy(_User);
        o.account = account;
        o.password = password;
        o.tableList = {};
        console.log("User: " + account + " Create");
        //console.log("_User: " + _User.tableList['1'].a);
        return o;
    },
    createTable(name,table) {
        
        if(this.tableList[name]) {
            console.log(this.tableList[name]);
            console.log("Error:Name Already Exist: " + this.account + ":" + name);
            return false;
        }
        this.tableList[name]=table;
        console.log("Table Name: " + name + " Created");
        return true;
    },
    getTable(name){
        if(this.tableList[name]) {
            console.log("Table Name: " + name + " Found");
            return this.tableList[name];
        }else {
            console.log("Error: Table Name:" + name + " Not Found");
            return false;
        }
    },
    updateTable(name,table) {
        if(this.tableList[name]) {
            this.tableList[name] = table;
            console.log("Table name: " + name +" Update");
            return true;
        }
        console.log("Error: Table name: " + name + " Not Found");
        return false;
    },
    removeTable(name) {
        if(this.tableList[name]) {
            this.tableList[name] = null;
            console.log("Table name: " + name + " Removed");
            return true;
        }
        console.log("Table name: " + name + " Not Found");
        return false;
    },
    packDataInUser(){
        var o = {}
        o.account = this.account;
        o.password = this.password;
        o.tableList = this.tableList;
        return o;
    },
    openDataInUser(o){
        this.account = o.account;
        this.password = o.password;
        this.tableList = o.tableList;
        console.log("Account:" + this.account + "loaded");
    }
}
exports.User = User;

var admin_account = "admin";
var admin_password = "123456";

var System = {
    userList:[],
    a:10,
    _User:[],
    new(sys,_User) {
        var o = {}
        o = util.copy(sys);
        o._User = _User;
        console.log("System Create");
        var admin = User.new(admin_account,admin_password,_User);
        o.userList.push(admin);
        //console.log("New_us:" + this._User.tableList['1'].a);
        return o;
    },
    packDataInSystem(){
        var o = {}
        for(i in this.userList){
            o[i] = this.userList[i].packDataInUser();
        }
        return o;
    },
    loadDataInSystem(o){
        for(i in o){
            //this.userList.push(User.new("load","123"));
            var user = User.new("load","123",this._User);
            console.log("account in user:" + user.account);
            console.log("index:" + i);
            this.userList[i] = user;
            //console.log("account:" + this.userList[i].account);
            this.userList[i].openDataInUser(o[i]);
        }
    },   
    addUser(account,password) {   
        if(password.length < 6){
                console.log("Error:PassWord Length Should >6");
                return false;
        }
        
        for(i in this.userList){
            if(i.account == account){
                console.log("Error:Same Name Account Found");
                return false;
            }  
        }
        var user = User.new(account,password,this._User);
        this.userList.push(user);
        return user;
    },
    logInCheck(account,password) {
        for(i in this.userList) {
            if(this.userList[i].account == account && this.userList[i].password == password){
                console.log("User: " + account + " Find");
               // console.log("LoginCheck_us:" + this._User.tableList['1'].a);
                return this.userList[i];
            }
        }
        console.log("Error:User: " + account + " Wrong Account or Password");
        console.log("LoginCheck_us:" + this._User.tableList['1'].a);
        return false;
    },
    save(dir) {
        console.log("Data Saving");
        var o = this.packDataInSystem();
        var data = util.packData(o);
        util.writeFile("bbb.txt",data,true);
        //console.log(data);
    },
    load(dir) {
        console.log("Data Loading");
        var data = util.readFile(dir);
        o = util.openData(data);
        this.loadDataInSystem(o);
        //return o;
    }

}
exports.System = System;