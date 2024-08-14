console.log("working..");
loadData()

// Declared Varibles
let textInpt = document.querySelector(".textInp");
let passwdInput = document.querySelector(".passwdInp");
let submitBtn = document.querySelector(".submit");

function maskPass(num){
    let str ='';
    for (let index = 0; index < num; index++) {
        str += '*';       
    }
    return str;
}

function copyPasswd(id){
    let passwd = JSON.parse(localStorage.getItem("data"));
    let getPass =passwd[id]['passwd']
    navigator.clipboard.writeText(getPass);
    alert("copied");
}

function deleteItem(index){
    let dataObj = JSON.parse(localStorage.getItem("data"));
    dataObj.splice(index,1);
    localStorage.setItem("data", JSON.stringify(dataObj));
    loadData()
}

function loadData(){
    let data = localStorage.getItem("data");
    if (data == null){
        dataParse = [];
    }
    else{
        let html = "";
        let counter = 0;
        let dataParse = JSON.parse(data);
        dataParse.forEach((element,index) => {
            html += `
            <tr>
                <td>${counter+=1}</td>
                <td>${element['website']}</td>
                <td class="pass" id="${index}">${maskPass(element['passwd'].length)}</td>
                <td><div><button class="copy" onclick="copyPasswd(${index})">Copy</button> <button class="delete" onclick="deleteItem(${index})">Delete</button></div></td>
            </tr>
            `
        });
        let skeleton = `
            <table id="table" border="1" cellspacing="0">
            <thead>
                <tr>
                    <th>S.n</th>
                    <th>Website</th>
                    <th>Password</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="tbody">
                ${html}
            </tbody>
            
        </table>
        `
        let table = document.querySelector(".table");
        if (dataParse.length > 0){           
            table.innerHTML = skeleton;
        }
        else{
            table.innerHTML = "<h2>Nothing to show ! Please add new data.</h2>"
            
        }
    }
    
}

  
submitBtn.addEventListener("click", ()=>{
    if (textInpt.value.length >0 && passwdInput.value.length >0){
        let data = localStorage.getItem("data");
        if (data == null){
            var dataObj = []
        }
        else{
            var dataObj = JSON.parse(data);
        }
        let dataInput = { website:textInpt.value, passwd:passwdInput.value }
        dataObj.push(dataInput);
        localStorage.setItem("data", JSON.stringify(dataObj));
        loadData();
    }
    else{
        alert("missing argument");
    }
    loadData()
    textInpt.value = "";
    passwdInput.value ="";
});