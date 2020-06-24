const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';


let toDos = [];

function changecolor(){
    event.target.style.background = "#ffffff";
}
function changecolor1(){
    event.target.style.background = "#2b303b";
}
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    setTimeout(function() {
        li.className = li.className + " del";
      }, 10);
    const cleanToDos = toDos.filter(function (toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("mouseover", changecolor, false);
    delBtn.addEventListener("mouseout", changecolor1, false);
    delBtn.addEventListener("click", deleteToDo);
    delBtn.style.float = 'right';
    delBtn.style.width = '35px';
    delBtn.style.height = "35px";
    delBtn.style.background = '#2b303b';
    delBtn.style.color = '#ccc';
    delBtn.style.borderRadius = "15px";
    delBtn.style.borderColor = '#2b303b';
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    setTimeout(function() {
        li.className = li.className + " show";
      }, 10);
    const toDoObj = {
        text: text, 
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function something(toDo){
    paintToDo(toDo.text);

}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(something);

    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);

}


init();
