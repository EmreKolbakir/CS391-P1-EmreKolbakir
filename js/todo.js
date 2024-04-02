document.addEventListener('DOMContentLoaded', function() {
    // Define input elements
    const newAcademicalTodoInput = document.getElementById('newAcademicalTodo');
    const newDailyTodoInput = document.getElementById('newDailyTodo');
    const newWorkTodoInput = document.getElementById('newWorkTodo');
    
    // Define list elements
    const academicalTodoList = document.getElementById('academicalTodoItems');
    const dailyTodoList = document.getElementById('dailyTodoItems');
    const workTodoList = document.getElementById('workTodoItems');

    // Load stored todos
    loadTodos('academical', academicalTodoList);
    loadTodos('daily', dailyTodoList);
    loadTodos('work', workTodoList);

    // Add task event listeners
    document.getElementById('addAcademicalTodoButton').addEventListener('click', function() {
        addTodo(newAcademicalTodoInput, academicalTodoList, 'academical');
    });

    document.getElementById('addDailyTodoButton').addEventListener('click', function() {
        addTodo(newDailyTodoInput, dailyTodoList, 'daily');
    });

    document.getElementById('addWorkTodoButton').addEventListener('click', function() {
        addTodo(newWorkTodoInput, workTodoList, 'work');
    });

    function addTodo(inputElement, todoList, listName) {
        const taskText = inputElement.value.trim();
        if (taskText === '') return;
        const listItem = createTodoItem(taskText, todoList, listName);
        todoList.appendChild(listItem);
        saveTodos(listName, todoList);
        inputElement.value = '';
    }

    function createTodoItem(taskText, todoList, listName) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        listItem.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            saveTodos(listName, todoList);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', function() {
            listItem.remove();
            saveTodos(listName, todoList);
        });

        listItem.appendChild(deleteButton);
        return listItem;
    }

    function saveTodos(listName, todoList) {
        const todos = Array.from(todoList.children).map(item => {
            return {
                text: item.firstChild.textContent, // The firstChild is the text node of listItem
                completed: item.classList.contains('completed')
            };
        });
        localStorage.setItem(listName + 'Todos', JSON.stringify(todos));
    }

    function loadTodos(listName, todoList) {
        const storedTodos = JSON.parse(localStorage.getItem(listName + 'Todos'));
        if (storedTodos) {
            storedTodos.forEach(todo => {
                const listItem = createTodoItem(todo.text, todoList, listName);
                if (todo.completed) {
                    listItem.classList.add('completed');
                }
                todoList.appendChild(listItem);
            });
        }
    }
});


