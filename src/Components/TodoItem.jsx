import React from "react";

export function TodoItem({todo, handleDelete, handleComplete}) {
    const {completed, id, task} = todo;

    const handleCompleteItem = () => {
        handleComplete(id);
    }

    const handleDeleteItem = () => {
        handleDelete(id);
    }

    return (
        <div className={`card p-1 bg-info-subtle ${completed ? 'opacity-25' : null}`}>
            <div className="row g-0">
                <div className="col-10 col-sm-11">
                    <div className="card-body d-flex align-items-center column-gap-3">
                        <input className="form-check-input mt-0 shadow-none" type="checkbox" defaultChecked={completed} onClick={handleCompleteItem} aria-label="Checkbox for mark as completed or not" />
                        <p className={`mb-0 ${completed ? "text-decoration-line-through" : null}`}>
                            {task}
                        </p>
                    </div>
                </div>
                <div className="col-2 col-sm-1 d-flex align-items-center">
                    <button type="button" className={`btn btn-outline-danger border-0 ${!completed ? "opacity-50" : null}`} title='Delete this to do'  onClick={handleDeleteItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
  