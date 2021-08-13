const btn = document.getElementById('showHidebtn')
const myForm = document.getElementById('myForm')
const hiddenInput = document.getElementById('timestamp')
const mainDataHeads = ['taskTitle', 'taskContent', 'taskType']

let Tasks = [];

// Set LocalStorag -----------------------------------
const getTasks = () => {
    tasks = localStorage.getItem('tasks') || '[]'
    return JSON.parse(tasks)
}
const setTasks = (tasks) =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// ---------------------------------------------------


// Show~Hide Functionality ---------------------------
function showHideBtn(){
    myForm.classList.toggle('d-none');
    if(myForm.classList.contains('d-none')) btn.firstElementChild.innerText = "Show Form"
    else btn.firstElementChild.innerText = "Hide Form"
}
btn.addEventListener('click', showHideBtn )
// ---------------------------------------------------


// Add Task using form -------------------------------
myForm.firstElementChild.addEventListener('submit', function(e){
    e.preventDefault();
    let editId = this.elements['timestamp'].value;
    console.log(editId);
    if( editId != 'false' ) {
        // Edit Task
        Tasks = getTasks(); // 1
        let getTaskIndex = Tasks.findIndex(task=> task.id == editId )
        let editedTask = Tasks[getTaskIndex];
        mainDataHeads.forEach(head => {
            //console.log(editedTask[head]);
            editedTask[head] = this.elements[head].value
        })
        Tasks[getTaskIndex] = editedTask;
        setTasks(Tasks);
    } else { 
        let task = { status: false, id : new Date().getTime() }
        // console.log(this.elements['taskTitle'].value)
        mainDataHeads.forEach(head => {
            task[head] = this.elements[head].value
        })
        Tasks = getTasks(); // 1
        Tasks.push(task); // 2
    }
    
    setTasks(Tasks); // 3
    this.reset();
    this.elements['timestamp'].value = 'false';
    // console.log(Tasks);
    showAllTasks()
})
// ----------------------------------------------------

// Create new element function ------------------------
let createNewElement = (elementTag, elementTxt, elementClasses,parent, attributes) => {
    myNewEl = document.createElement(elementTag)
    if(elementTxt!='') myNewEl.innerText = elementTxt
    if(elementClasses!="") myNewEl.className =elementClasses
    parent.appendChild(myNewEl)  
    attributes.forEach(attr=>{
            myNewEl.setAttribute(attr.attrName, attr.attrVal)
        })
    return myNewEl  
}
// ----------------------------------------------------

const emptyBox = document.getElementById('empty');
const wrapper = document.querySelector('#wrapper')
// Show all tasks -------------------------------------
function showAllTasks(){
    Tasks = getTasks();
    if(Tasks.length == 0){
        emptyBox.classList.remove('d-none');
        emptyBox.innerText = "No data";
        wrapper.innerHTML = '';
    } else {
        emptyBox.classList.add('d-none');
        wrapper.innerHTML = '';
        Tasks.forEach(task => {
            let type = (task['taskType']==1)? 'alert-primary':'alert-warning';
            let newEle = createNewElement('div','','col-3 border border-success p-3 m-2 '+type,wrapper,[])
            createNewElement('h2',task['taskTitle'],'',newEle,[])
            createNewElement('p',task['taskContent'],'',newEle,[])
            let delBtn = createNewElement('button','Delete','btn btn-danger m-2',newEle, [])
            let edtBtn = createNewElement('button','Edit','btn btn-success',newEle, [])
            delBtn.addEventListener('click',function(e) {deleteTask(task)})
            edtBtn.addEventListener('click',function(e) {editTask(task)})
            wrapper.appendChild(newEle);
        })
    }

}
// ----------------------------------------------------

// Delete Task ----------------------------------------
let deleteTask = (task) => {
    tasks = getTasks();
    let id = tasks.findIndex(t=> t.id == task.id);
    tasks.splice(id,1);
    setTasks(tasks);
    showAllTasks();
}
// ----------------------------------------------------

// Edit Task ------------------------------------------
let editTask = (task) => {
    tasks = getTasks();
    let elem = tasks.findIndex(t => t.id == task.id);
    // Add the task data inside the form
    myForm.firstElementChild.elements['timestamp'].value = tasks[elem].id
    myForm.firstElementChild.elements['taskTitle'].value = tasks[elem].taskTitle
    myForm.firstElementChild.elements['taskContent'].value = tasks[elem].taskContent
    myForm.firstElementChild.elements['taskType'].value = tasks[elem].taskType
    // console.log(tasks[elem].id)
    // setTasks(tasks);
    showAllTasks();
}
// ----------------------------------------------------

showAllTasks();