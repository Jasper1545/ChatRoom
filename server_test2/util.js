//bug in openFile() need to be fixed

var fs = require("fs");
function check(sign) {
    if(sign){
        console.log("sign is trun");
    }else {
        console.log("sign is false");
    }
}
exports.check = check;

function copy(o) {
    var o_c = {}
    for(i in o) {
        o_c[i] = o[i];
    }
    return o_c;
}
exports.copy = copy;

function sizeOf(o) {//tile 3
    if(typeof(o)=='string'){
        var size = 0;
        if(o.indexOf("/")!=-1){
            size = size + 1;
            if(o.indexOf("|")!=-1){
                size = size +1;
                if(o.indexOf("*")!=-1) {
                    size = size +1;
                    if(o.indexOf("~"!=-1)){
                        size = size +1;
                    }   
                }
            }
        }
        return size;
    }

    if(typeof(o)=='object'){
        var size_0 = 0;
        var size_1 = 0;
        var size_2 = 0;
        var size_3 = 0;
        var size_4 = 0;
        var size_5 = 0;
        var size = 0;
        for(i in o) {
            for(j in o[i]){
                for(k in o[i][j]) {
                    for(l in o[i][j][k]) {
                        if(typeof(o[i][j][k]) != "string"){
                            console.log(l + ":" + o[i][j][k][l]);
                            size_3 = 1;
                        }
                    }
                    if(typeof(o[i][j]) != "string"){
                        console.log(k + ":" + o[i][j][k]);
                        size_2 = 1;
                    }
                }
                if(typeof(o[i]) != "string"){
                    console.log(j + ":" + o[i][j]);
                    size_1 = 1;
                }  
            }
            if(typeof(o) != "string"){
                console.log(i + ":" + o[i]);
                size_0 = 1;
            }
        }
        size = size_0 + size_1 + size_2 + size_3 + size_4 + size_5;
        return size;
    }
    //console.log("Error:Typy:unknow");
    //return null;
}
exports.sizeOf = sizeOf;

function openData(data) {

    if(!data || typeof(data) != 'string' || data.length == 0) {
        console.log("Error:Open Data Error 1");
        if(!data){
            console.log("err 1");
        }
        if(typeof(data) != 'string'){
            console.log("err 2");
        }
        if(data.length == 0){
            console.log("err 3");
        }
        return null;
    }
    
    var size = sizeOf(data);
    console.log("Opening Data size:"+ size);
    if(size  == 0){
        console.log("Error:Open Data Error 2");
        return null;
    }
    
    switch(size){
        case 1:
            console.log("Enter 1");
            var object = {};
            var strs = [];
            strs = data.split("/");
            for(var i=0;i<strs.length;i++) {
                if(strs[i+1]){
                    var name = strs[i];
                    var value = strs[i+1]
                    object[name] = value;
                    i = i+1;
                }    
            }
            return object;
            break;

        case 2:
            console.log("Enter 2");
            var obj_1 = {};
            var strs_1 = [];
            strs_1 = data.split("/");
            for(var i=0;i<strs_1.length;i++) {
                var strs_2 = [];
                var obj_2 = {};
                strs_2 = strs_1[i].split("|");
                for(var j=0;j<strs_2.length;j++) {
                    if(j!=strs_2.length-1){
                        obj_2[strs_2[j]] = strs_2[j+1];
                        j=j+1;
                    }else {
                        if(strs_2[j]){
                            obj_1[strs_2[j]] = copy(obj_2);
                        }  
                    }
                }
            }
            return obj_1;
            break;
        case 3:
            console.log("Enter 3");
            var strs_1 = data.split("/");
            var obj_1 = {};
            for(var i=0;i<strs_1.length;i++) {
                if(i!=strs_1.length-1){
                    var str_2 = strs_1[i].split("|");
                    var obj_2 = {};
                    for(var j=0;j<str_2.length;j++){
                        var str_3 = str_2[j].split("*");
                        var obj_3 = {};
                        if(j!=str_2.length-1){
                            for(var h=0;h<str_3.length;h++) {
                                if(h!=str_3.length-1){
                                    obj_3[str_3[h]]=str_3[h+1];//a:1
                                    h=h+1;
                                }else {
                                    obj_2[str_3[h]] = copy(obj_3);// 'table_1':table_1
                                }
                            }
                        }else {
                            obj_1[str_2[j]] = copy(obj_2);//'List_1':tableList
                        }
                    }
                }     
            }
            return obj_1;
            break;
        case 4:
            console.log("Enter 4");
            var strs_1 = data.split("/");
            var obj_1 = {};
            for(var i=0;i<strs_1.length;i++) {
                if(i!=strs_1.length-1){
                    var str_2 = strs_1[i].split("|");
                    var obj_2 = {};
                    for(var j=0;j<str_2.length;j++) {
                        if(j!=str_2.length-1){
                            var str_3 = str_2[j].split("*");
                            var obj_3 = {};
                            for(var h=0;h<str_3.length;h++) {
                                if(h!=str_3.length-1){
                                    var str_4 = str_3[h].split("~");
                                    var obj_4 = {};
                                    for(var k=0;k<str_4.length;k++) {
                                        if(k!=str_4.length-1){
                                            obj_4[str_4[k]] = str_4[k+1];
                                            k=k+1;
                                        }else{
                                            obj_3[str_4[k]]=copy(obj_4);
                                        }
                                    }
                                }else {
                                    obj_2[str_3[h]] = copy(obj_3);// 'table_1':table_1
                                }
                            }
                        }else {
                            obj_1[str_2[j]] = copy(obj_2);//'List_1':tableList
                        }
                    }
                }     
            }
            return obj_1;
            break;
        default:
            console.log("Data Size Switch Error");
            return null;
            break;
    }
}
exports.openData = openData;

function packData(object) {
    if(!object) {
        console.log("Object Error");
        return null;
    }

    var size = sizeOf(object);
    
    switch(size) {
        case 1:
            var data = "";
            for( i in object) {      
                data = data + i + "/" + object[i] + "/";
            }  
            return data;
            break;
        case 2:
            var data = "";
            for( i in object) {      
                for(j in object[i]) {
                    data = data + j + "|" + object[i][j] + "|";
                }
                data = data + i + "/";
            }  
            return data;
            break;
        case 3:
            var data = "";
            for( i in object) {      
                for(j in object[i]) {
                    for(h in object[i][j]){
                        data = data + h + "*" +  object[i][j][h] + "*";
                    }
                    data = data + j + "|";
                }
                data = data + i + "/";
            }  
            return data;
            break;
        case 4:
            var data = "";
            for( i in object) {      
                for(j in object[i]) {
                    for(h in object[i][j]){
                        for(k in object[i][j][h]){
                            data = data + k + "~" + object[i][j][h][k] + "~";
                        }
                        data = data + h + "*" +  object[i][j][h] + "*";
                    }
                    data = data + j + "|";
                }
                data = data + i + "/";
            }  
            return data;
            break;
        default:
            console.log("Error: Pack Object Size > 3");
            break;
    }
}
exports.packData = packData;

function writeFile(name,new_data,sign) {
    var data = "";
    if(!sign){
        fs.readFile(name,function(err,old_data) {
            if(err) {
                return console.error(err);
            }
            console.log("File name:"+ name +" Read Succeed");
            data = old_data + new_data;

            fs.writeFileSync(name,data,function(err) {
                if(err) {
                    return console.error(err);
                }
                console.log("File name:"+ name +" Write Succeed");
            }); 

        }); 
    }else {
        fs.writeFile(name,new_data,function(err) {
            if(err) {
                return console.error(err);
            }
            console.log("File name:"+ name +" Write Succeed");
        }); 
    }  
}
exports.writeFile = writeFile;

function readFile(name) {
    var data = fs.readFileSync(name);
    data = data.toString();
    if(data != ""){
        console.log("File:" + name + " Read Succeed");
        return data.toString();
    }else{
        console.log("Error: File:" + name + " Read Failed");
        return null;
    }
    
}
exports.readFile = readFile;
