document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('todo-table')) {
        fetchTodos();
    }

    if (document.getElementById('todo-form')) {
        document.getElementById('todo-form').addEventListener('submit', addTodo);
    }

    if (document.getElementById('edit-todo-form')) {
        document.getElementById('fetch-todo').addEventListener('click', fetchTodo);
        document.getElementById('edit-todo-form').addEventListener('submit', updateTodo);
        document.getElementById('cancel-edit').addEventListener('click', cancelEdit);
    }
});

function fetchTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(todos => {
            const todoTableBody = document.querySelector('#todo-table tbody');
            todoTableBody.innerHTML = ''; // Clear existing table rows
            todos.forEach(todo => {
                const tr = document.createElement('tr');
                const idTd = document.createElement('td');
                const descTd = document.createElement('td');

                idTd.textContent = todo.id;
                descTd.textContent = `${todo.title} (${todo.completed ? 'Completed' : 'Not Completed'})`;

                tr.appendChild(idTd);
                tr.appendChild(descTd);
                todoTableBody.appendChild(tr);
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

function fetchTodo() {
    const todoId = document.getElementById('todo-id').value;

    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        .then(response => response.json())
        .then(todo => {
            document.getElementById('edit-title').value = todo.title;
            document.getElementById('edit-completed').checked = todo.completed;
        })
        .catch(error => console.error('Error fetching TODO item:', error));
}

function updateTodo(event) {
    event.preventDefault();
    const todoId = document.getElementById('todo-id').value;
    const title = document.getElementById('edit-title').value;
    const completed = document.getElementById('edit-completed').checked;

    const updatedTodo = {
        id: todoId,
        title: title,
        completed: completed
    };

    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
    })
    .then(response => {
        const editResponseMessage = document.getElementById('edit-response-message');
        if (response.ok) {
            editResponseMessage.textContent = `TODO with ID: ${todoId} updated successfully.`;
        } else {
            editResponseMessage.textContent = `Failed to update TODO with ID: ${todoId}.`;
        }
    })
    .catch(error => console.error('Error updating TODO:', error));
}

function cancelEdit() {
    window.location.href = 'index.html';
}
