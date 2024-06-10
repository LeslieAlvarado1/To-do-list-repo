document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('todo-list')) {
        fetchTodos();
    }

    if (document.getElementById('todo-form')) {
        document.getElementById('todo-form').addEventListener('submit', addTodo);
    }
});

function fetchTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todo-list');
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = `${todo.title} (${todo.completed ? 'Completed' : 'Not Completed'})`;
                todoList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching TODO items:', error));
}

function addTodo(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const completed = document.getElementById('completed').checked;

    const newTodo = {
        title: title,
        completed: completed
    };

    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(data => {
        const responseMessage = document.getElementById('response-message');
        responseMessage.textContent = `New TODO added with ID: ${data.id}`;
        document.getElementById('todo-form').reset();
    })
    .catch(error => console.error('Error adding TODO:', error));
}
