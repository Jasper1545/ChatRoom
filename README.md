# ChatRoom
-----------------
### 基于node.js 中的tcp(.net)的聊天室服务器与客户端
----------------
### 使用方法
1.安装node.js及相关依赖

2.windows用户在工程根目录下使用cmd输入: ss 

  开启服务器
  
3.输入：cc
  
  开启客户端

---------------------
### DataBase说明
1.Util为工具类，包含读写文件readfile和writefile，包装和打开对象数组的packdata和opendata
2.UserSystem中的save和load支持把userlist中的userdata（包括account，password和tableList）存储至项目文件夹中的data.txt文件
3.只能储存不超过4维的不包含方法的对象，如果包含会报错

