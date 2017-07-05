//client.js

var client_Command = {
    end_cmd:"end"
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

var Client_State = {
    unsign:0,
    sign:1
}

var Account_State = {
    wait_account:0,
    wait_password:1,
    complete:2
}


var account = null;
var password = null;
var strs = new Array();

var client_State = Client_State.unsign;
var account_State = Account_State.wait_account;

var net = require('net');


var chat = function() {
    console.log('connect to server\r');
    process.stdin.resume();

    process.stdin.on('data',function(data){
        process.stdin.pause();
        
       if(data.toString() == "\r\n"){
           process.stdin.resume();
           return;
       }

        switch(client_State) {
            case Client_State.unsign:
                switch(account_State) {
                    case Account_State.wait_account:
                        if(data != "\r\n"){
                            strs = data.toString().split("\r\n");
                            account = strs[0];
                            account_State = Account_State.wait_password;
                            console.log("Please Enter password:");
                            process.stdin.resume();
                            break;
                        }else {
                            console.log("Please Enter Account:");
                            process.stdin.resume();
                        }
        
                    case Account_State.wait_password:
                        if(data != "\r\n"){
                            strs = data.toString().split("\r\n");
                            password = strs[0];
                            client.write(Request_Code.signIn + "*" + account + "*" + password);
                        }else {
                            console.log("Please Enter password:");
                            process.stdin.resume();
                        }
                        break;

                    case Account_State.complete:
                    //-----------------
                    break;
                }
                break;

            case Client_State.sign:
                if(data.toString() != "\r\n"){
                    var strs = data.toString().split("\r\n");
                    if(strs[0].toString() == client_Command.end_cmd){
                        console.log("End Command Receive");
                        client.write(Request_Code.signOut.toString() + "*" + account);
                        //client.end();
                    }else {
                        var message = Request_Code.message + "*" + account + "*" + strs[0].toString();
                        client.write(message);
                        process.stdin.resume();
                    }
     
                }
                break;
        }
});

console.log("Please Enter Account:");
    
}

var client = net.connect({port:8080},chat);

client.on('data',function(data){
    //console.log("Server : " + data.toString());
    strs = data.toString().split("*");
    switch(client_State) {
        case Client_State.unsign:
            switch(Number(strs[0])){
                case Respond_Code.sign_in_succeed:
                    console.log("Sign In Succeed");
                    account_State = Account_State.complete;
                    break;
                case Respond_Code.sign_in_failed:
                    console.log("Sign Up Failed");
                    process.stdin.resume();
                    break;
                
                case Respond_Code.log_in_succeed:
                    console.log("Log In Succeed");
                    client_State = Client_State.sign;
                    account = strs[1];
                    password = strs[2];
                    console.log("Account:  "+account);
                    console.log("password: "+password);
                    process.stdin.resume();
                    break;
            }
            break;
        case Client_State.sign:
            switch(Number(strs[0])){
                case Respond_Code.message:
                    console.log(strs[1].toString() + ": " + strs[2].toString());
                    process.stdin.resume();
                    break;
                
                case Respond_Code.log_out_succeed:
                    console.log("Log Out Succeed");
                    client.end();
                    break;
            }
            break;
    }

});

client.on('error',function(err){
    console.log(err.message);
    console.log("Lost Connection");
    console.log("Press Enter to Exit");
});

client.on('end',function(){
    console.log('disconnected from server');
    process.exit();
});

process.on('exit',function(){
    console.log("process exit");
});