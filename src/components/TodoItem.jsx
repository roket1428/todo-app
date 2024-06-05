function TodoItem(todoName, id, todosDone) {
  const updateCheckboxes = (checkbox) => {
    todosDone.current[checkbox.target.attributes.id.value - 1] = todosDone.current[checkbox.target.attributes.id.value - 1] ? false : true;
  }
  return (
    <>
      <input onChange={updateCheckboxes} className="todo-checkbox" type="checkbox" name={id} id={id} />
      <p className="inline ml-5">{todoName}</p>
    </>
  )
}
export default TodoItem;
