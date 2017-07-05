o_1 = {
    a:1,
    b:2,
    c:function(a,b){
        console.log(this.a+this.b);
        console.log(a+b)
    }
}

o_1.d = 10;

var o_2 = {}

o_2.a = o_1.a;
o_2.b = o_1.b;


console.log(o_1.d);