const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

const checkboxes = document.getElementsByClassName(classNames.TODO_CHECKBOX);

let itemCount = +itemCountSpan.textContent;


function newTodo() {
  const todo = prompt("Введите текст нового задания", "");

  if(todo && todo !== null){
    const newLi = document.createElement('li');
    
    const todoContainer = document.createElement('div');
    todoContainer.classList.add(classNames.TODO_ITEM);
    
    const todoCheckbox = document.createElement('input');
    todoCheckbox.classList.add(classNames.TODO_CHECKBOX);
    todoCheckbox.setAttribute('type', 'checkbox');
    todoCheckbox.setAttribute('onClick', 'setCountOfUncheckedItems()');
    
    const todoText = document.createElement('span');
    todoText.classList.add(classNames.TODO_TEXT);
    todoText.innerHTML = todo;
    
    const todoDelete = document.createElement('button');
    todoDelete.classList.add(classNames.TODO_DELETE);
    todoDelete.setAttribute('onClick', 'deleteItem(this)');
    todoDelete.innerHTML = 'x';
    
    todoContainer.appendChild(todoCheckbox);
    todoContainer.appendChild(todoText);
    todoContainer.appendChild(todoDelete);
    
    newLi.appendChild(todoContainer);
    list.appendChild(newLi);
    itemCount += 1;

    setCountOfItems();
    setCountOfUncheckedItems(); 
  }
}

function setCountOfUncheckedItems() {
  let markedItemsCount = 0;
  
  for(let i = 0; i < checkboxes.length; i++){
    if (checkboxes[i].checked){
      markedItemsCount++;
    }
  }
  
  const lengthOfCheckedItems = checkboxes.length;
  uncheckedCountSpan.innerHTML = lengthOfCheckedItems - markedItemsCount;
}

function setCountOfItems() {
  const listItems = document.querySelectorAll('.todo-list li');
  itemCount = 0;
  
  for(let i = 0; i < listItems.length; i++){
    itemCount++;
  }
  
  itemCountSpan.innerHTML = itemCount;
}

function deleteItem(button) {
  const result = confirm("Вы точно хотите удалить этот элемент?");
  
  if(result){
    button.parentElement.parentElement.remove();
    itemCountSpan.innerHTML = itemCountSpan.innerText - 1;
    
    setCountOfItems()
    setCountOfUncheckedItems();
  }
}