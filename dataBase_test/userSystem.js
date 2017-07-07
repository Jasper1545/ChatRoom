var Util = require('./util');

var User = {
    account:null,
    password:null,
    tableList:{},
    new(account,password){
        var o = {};
        for(i in this){
            o[i] = this[i];
        }
        o.account = account;
        o.password = password;
        o.tableList = {};
        console.log("Account:"+account+" Account created");
        return o;
    },
    createTable(name,table){
        if(this.tableList[name]){
            console.log("Acconut:"+this.account+" Table:"+name +" create Faild:Same Name Table Exist");
            return false;
        }else{
            this.tableList[name] = Util.copy(table);
            console.log("Acconut:"+this.account+" Table:"+name +" created");
            return true;
        }  
    },
    updateTable(name,table){
        if(this.tableList[name]){
            this.tableList[name] = Util.copy(table);
            console.log("Acconut:"+this.account+" Table:"+name +" Updated");
            return true;
        }else{
            console.log("Acconut:"+this.account+" Table:"+name +" Updated Faild:Name not Find");
            return false;
        } 
    },
    packDataObject(){
        var o = {};
        o.account = this.account;
        o.password = this.password;
        o.tableList = this.tableList;
        return o;
    },
    openDataObject(o){
        this.account = o.account;
        this.password = o.password;
        this.tableList = Util.copy(o.tableList);
    }   
    
}
exports.User = User;

var UserSystem = {
    userList:[],
    new() {
        var o = Util.copy(this);
        o.userList = [];
        console.log("UserSystem Created");
        return o;
    },
    addUser(account,password) {
        var user = User.new(account,password);
        this.userList.push(user);
        console.log("Account:"+account +" Added");
    },
    searchUser(account){
        for(i in this.userList){
            if(this.userList[i].account == account){
                console.log("User:"+account + " Found");
                return this.userList[i];
            }
        }
        console.log("User:"+account + " Not Found");
        return false;
    },
    save() {
        var list = [];
        for(i in this.userList){
            list[i] = this.userList[i].packDataObject();
        }
        var data = Util.packData(list);
        console.log("Save Data:" + data);
        Util.writeFile('data.txt',data,true);
        console.log("Save succeed");
    },
    load() {
        var data = Util.readFile('data.txt');
        console.log("data:"+ data);
        var o = Util.openData(data);
        for(var i in o){
            var user = User.new("","");
            var userdata = Util.copy(o[i]);
            user.openDataObject(userdata);
            this.userList[i] = user;
        }
        console.log("System Load Succeed");
    }
}
exports.UserSystem = UserSystem;



