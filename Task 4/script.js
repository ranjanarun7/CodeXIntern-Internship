// Selecting elements from the DOM
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

let todos = []; // To store todos

// Add Todo Function
addTodoBtn.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false,
        };
        todos.push(todo);
        renderTodos();
        todoInput.value = ''; // Clear input after adding
    }
});

// Render Todos Function
function renderTodos() {
    todoList.innerHTML = ''; // Clear current list
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        if (todo.completed) {
            todoItem.classList.add('completed');
        }

        todoItem.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-buttons">
                <button class="complete-btn" onclick="markAsComplete(${todo.id})">Complete</button>
                <button class="update-btn" onclick="updateTodoPrompt(${todo.id})">Update</button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

// Mark Todo as Complete
function markAsComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    renderTodos();
}

// Delete Todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Update Todo
function updateTodoPrompt(id) {
    const newTodoText = prompt('Update your todo:');
    if (newTodoText) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.text = newTodoText;
            }
            return todo;
        });
        renderTodos();
    }
}
