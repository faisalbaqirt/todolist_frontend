import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodolist,
  createTodo,
  updateStatusTodo,
  deleteTodo,
} from "../redux/actions/todoAction";

const Todolist = () => {
  const dispatch = useDispatch();
  const todolist = useSelector((state) => state.todo.todolist);
  const [isLoading, setIsLoading] = useState(false);
  const [newTodo, setNewTodo] = useState({
    task: "",
    description: "",
  });
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    dispatch(getTodolist());
  }, [dispatch]);

  const handleCreate = () => {
    setIsLoading(true);

    const { task, description } = newTodo;
    dispatch(createTodo(task, description));

    setIsLoading(false);
    setNewTodo({
      task: "",
      description: "",
    });
    dispatch(getTodolist());
  };

  const handleUpdateStatus = (id, currentStatus) => {
    if (currentStatus === "todo") {
      dispatch(updateStatusTodo(id, "completed"));
    }
    dispatch(getTodolist());
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    dispatch(getTodolist());
  };

  const filteredTodolist = todolist.filter((todo) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return todo.status === filterStatus;
    }
  });

  return (
    <>
      <div className="container-fluid todolist-container">
        <div className="todolist-section">
          <h2 className="text-center title-sec mb-3">Todolist</h2>
          {isLoading && (
            <div className="loader-container">
              <div className="spinner-border text-light" role="status"></div>
            </div>
          )}
          <div className="add-todo">
            <input
              type="text"
              className="form-control add-input"
              placeholder="Task..."
              value={newTodo.task}
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  task: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              className="form-control add-input"
              placeholder="Description..."
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({
                  ...newTodo,
                  description: e.target.value,
                })
              }
            />
            <button onClick={handleCreate} className="btn add-button">
              Add
            </button>
          </div>
          {todolist.length === 0 ? (
            <li className="todo-item">No task available</li>
          ) : (
            <>
              <div className="filter-buttons">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`btn filter-button ${
                    filterStatus === "all" ? "active" : ""
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus("completed")}
                  className={`btn filter-button ${
                    filterStatus === "completed" ? "active" : ""
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilterStatus("todo")}
                  className={`btn filter-button ${
                    filterStatus === "todo" ? "active" : ""
                  }`}
                >
                  Todo
                </button>
              </div>
              <div className="todo-list">
                {filteredTodolist.map((todo) => (
                  <li key={todo.id} className="todo-item">
                    <div className="todo-details">
                      <div className="todo-task">{todo.task}</div>
                      <div className="todo-description">{todo.description}</div>
                    </div>
                    <div className="todo-actions">
                      {todo.status === "todo" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(todo.id, todo.status)
                          }
                          className="update-status-button"
                        >
                          Update Status
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Todolist;
