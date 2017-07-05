//server.js
var fs = require('fs');
var writestream = fs.createWriteStream('record.text');

var server_Command = {
    end_cmd:"end",
    check_memory_cmd:"check -m"
}

var Request_Code = {
    signIn:0,
    message:1,
    signOut:2
}

var Respond_Code = {
    sign_in_succeed:0,
    sign_in_failed:1,
    log_in_succeed:2,
    log_in_failed:3,
    log_out_succeed:4,
    log_out_failed:5,
    message:6
}

var User = {
    account:null,
    password:null,
    socket:null,
    new(account,password){
        o = {};
        o.account = account;
        o.password = password;
        o.socket = this.socket;
        o.addSocket = this.addSocket;
        o.removeSocket = this.removeSocket;
        return o;
    },
    addSocket(socket){
        this.socket = socket;
    },
    removeSocket(){
        this.socket = null;
    }
}

var Users = {
    userList:[],
    searchName(account){
        var sign = false; 
        this.userList.forEach(function(user) {
            if(user.account == account){
                sign = user;
            }
        }, this);
        return sign;
    },
    addUser(user){
        console.log("User Account: "+ user.account + " Add");
        this.userList.push(user);
        return user;
    } 
}



var net = require('net');
var server = net.createServer();
var strs = new Array();

server.on('error',function(err){
    console.log("Server error : "+ err.message);
});

server.on('end',function(){
    console.log('Server closed');
});

server.on('connection',function(socket){
    
    socket.on('data',function(data){
        console.log("Received data:" + data.toString());
        strs = data.toString().split("*");
        console.log("request code:" + Number(strs[0]));        

        switch(Number(strs[0])) {
            case Request_Code.signIn:
                console.log("signIn Request");
                sign = Users.searchName(strs[1]);
                if(!sign){
                    user = Users.addUser(User.new(strs[1],strs[2]));   
                    socket.write(Respond_Code.sign_in_succeed.toString());
                    user.addSocket(socket);
                    socket.write(Respond_Code.log_in_succeed.toString()+ "*" + strs[1] + "*" + strs[2]);

                }else if(sign.password == strs[2]){
                    sign.addSocket(socket);
                    socket.write(Respond_Code.log_in_succeed.toString()+ "*" + strs[1] + "*" + strs[2]);

                }else{
                    console.log("Same Name Found: " + strs[1] + " or Wrong PassWord");
                    socket.write(Respond_Code.sign_in_failed.toString());       
                }
                break;
            
            case Request_Code.message:
                console.log("Message Request");
                var message = Respond_Code.message + "*" + strs[1] + "*" + strs[2];
                writestream.write(message,'UTF8');
                Users.userList.forEach(function(user) {
                    if(user.socket){
                        if(user.socket != socket){
                            user.socket.write(message);
                        }
                    }                    
                }, this);
                break;
            
            //case Request_Code.signout:
            case Request_Code.signOut:
                console.log("LogOut Request");
                var user = Users.searchName(strs[1]);
                if(user){
                    
                    message = user.account + " had sign out";
                    console.log(message);
                    Users.userList.forEach(function(user) {
                        if(user.socket){
                            if(user.socket != socket){
                                user.socket.write(message);
                            }else {
                                user.socket.write(Respond_Code.log_out_succeed.toString());
                            }
                        }                    
                    }, this);
                    user.removeSocket();
                }
                break;
        }

    });

});

server.listen(8080,function(){
    console.log("Server bound");
});

process.on('exit',function(){
    console.log("process end");
});

process.stdin.setEncoding('utf8');

function end_cmd_Func() {
    server.close();
    process.exit(1);
}

function check_memory_cmd_Func() {
    console.log("\r");
    console.log("Memory Usage:");
    console.log(process.memoryUsage());
    console.log("\r");
}




process.stdin.on('data',function(data){
    var strs = new Array();
    strs = data.split("\r\n");
    cmd = strs[0];

    switch(cmd) {
        case server_Command.end_cmd:
            end_cmd_Func();
            break;

        case server_Command.check_memory_cmd:
            check_memory_cmd_Func()
            break;
        
        default:
            console.log("Wrong Command : " + cmd);
            break;
    }
});





