import './style.css'


interface Todo {
    readonly id:string
    title:string;
    isCompleted:boolean;
}

const todos:Todo[] = [];

const todoContainer = document.querySelector(".todoContainer") as HTMLDivElement

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement

const myForm = document.getElementById("myForm") as HTMLFormElement

myForm.onsubmit = (e:SubmitEvent) =>{
    e.preventDefault();

    const todo:Todo = {
        title:todoInput.value,
        isCompleted:false,
        id:String(Math.random()*1000)

    };

    todos.push(todo);
    todoInput.value = ""
    rendorTodo(todos)
    
}

const genrateTodoItem = (title:string , isCompleted:boolean , id: string) => {
    const todo = document.createElement("div") as HTMLDivElement
    todo.className = "todo";

    // creating a checkbox
    const checkBox = document.createElement("input") as HTMLInputElement
    checkBox.setAttribute("type","checkbox")
    checkBox.className = "isCompleted"
    checkBox.checked = isCompleted
    checkBox.onchange = ()=> {

        todos.find( item => {
           if( item.id === id) item.isCompleted = checkBox.checked
        })
        paragraph.className = checkBox.checked ? "textCut" : ""
    }

     // creating p for title
     const paragraph = document.createElement("p") as HTMLParagraphElement;
     paragraph.innerText = title
     paragraph.className = isCompleted ? "textCut" : ""

     // created delete button
     const btn = document.createElement("button") as HTMLButtonElement
     btn.innerText = "X"
     btn.className = "deleteBtn";
     btn.onclick = () => {
        deleteTodo(id);
     }

     // appending all todo items
     todo.append(checkBox,paragraph,btn);

     todoContainer.append(todo)
}

const deleteTodo = (id:string) => {
    const idx = todos.findIndex((item) => item.id === id);
    
    todos.splice(idx,1)
    rendorTodo(todos)
}

const rendorTodo = (todos:Todo[]) => {
    todoContainer.innerText = ""
    todos.forEach( item => {
        genrateTodoItem(item.title, item.isCompleted,item.id);
    })

}