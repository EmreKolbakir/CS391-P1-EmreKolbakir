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
    newAcademicalTodoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTodo(newAcademicalTodoInput, academicalTodoList, 'academical');
        }
    });

    newDailyTodoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTodo(newDailyTodoInput, dailyTodoList, 'daily');
        }
    });

    newWorkTodoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTodo(newWorkTodoInput, workTodoList, 'work');
        }
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

        return listItem;
    }

    function saveTodos(listName, todoList) {
        const todos = Array.from(todoList.children).map(item => {
            return {
                text: item.textContent, // Use textContent directly
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

    // Add Clear List buttons functionality
    document.querySelectorAll('.clear-list-button').forEach(button => {
        button.addEventListener('click', function() {
            const list = button.parentElement.querySelector('ul');
            list.querySelectorAll('.completed').forEach(item => {
                item.remove();
            });
            const listName = list.id.replace('TodoItems', '');
            saveTodos(listName, list);
        });
    });
});
