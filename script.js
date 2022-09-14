var clickcount = 0;

function showform(){

    document.getElementById("myForm").style.display = "block";
}

function closeForm(flag){
    var name = document.getElementById("name").value;
    var mail = document.getElementById("mail").value;
    var num = document.getElementById("num").value;
    
    if(check(name,mail,num)){
        var gfgDb = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);  
        var msg;
        gfgDb.transaction(function (tx) {  
            console.log("creation")
        tx.executeSql('CREATE TABLE IF NOT EXISTS USERINFO (name , email, mobile)');  
        tx.executeSql('INSERT INTO USERINFO (name , email, mobile) VALUES (?,?,?)',[name,mail,num]); 
        //console.log("creted") 
        });

        gfgDb.transaction(function (tx) { 
            tx.executeSql('SELECT * FROM USERINFO', [], function (tx, results) { 
               var len = results.rows.length, i; 
               msg = "<p>Found rows: " + len + "</p>";
               for (i = 0; i < len; i++) { 
                console.log(results.rows[i]); 
             } 
            }, null); 
         });
        //console.log("set");
        

        document.getElementById('download').click();
        document.getElementById("myForm").style.display = "none";
    }
    else{
        alert("please enter all/correct details");
    }
    
}


function check(name,mail,num){
    var e = String(mail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    var n = num.match(/^\d{10}$/);
    if(n && e){
        return true;
    }
    else{return false;}
}

function getdetails(){
    if(clickcount==3){
        let pass = prompt("enter key");
        if(pass=="1234"){
            var gfgDb = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
            var text="Name,Email,Mobile num\n"
            gfgDb.transaction(function (tx) { 
                tx.executeSql('SELECT * FROM USERINFO', [], function (tx, results) { 
                   var len = results.rows.length, i;
                   for (i = 0; i < len; i++) { 
                    text+=String(results.rows[i].name)+","+String(results.rows[i].email)+","+String(results.rows[i].mobile)+"\n";
                 }
                  console.log(text);
                  download("details.txt",text);
                }, null); 
             });
            
        }
        else{
            alert("wrong key");
        }
        clickcount=0;
    }
    else{clickcount+=1}
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }