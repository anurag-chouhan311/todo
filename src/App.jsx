import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";
function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [userName, setUserName] = useState();
  const [bookName, setBookName] = useState();
  const [authorName, setAuthorName] = useState();
  const [price, setPrice] = useState();
  const [currentEdit, setCurrentEdit] = useState(-1);
  const [currentEditedItem, setcurrentEditedItem] = useState("");

  const addTodo = () => {
    let data = {
      user: userName,
      book: bookName,
      author: authorName,
      price: price,
    };
    let updateTodo = [...allTodos];
    updateTodo.push(data);
    setAllTodos(updateTodo);
    localStorage.setItem("todolist", JSON.stringify(updateTodo));
    setUserName("");
    setBookName("");
    setAuthorName("");
    setPrice("");
  };

  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setcurrentEditedItem(item);
  };

  const handleUpdatedName = (value) => {
    setcurrentEditedItem((prev) => {
      return { ...prev, user: value };
    });
  };

  const handleUpdatedBookname = (value) => {
    setcurrentEditedItem((prev) => {
      return { ...prev, book: value };
    });
  };

  const handleUpdatedAuthorname = (value) => {
    setcurrentEditedItem((prev) => {
      return { ...prev, author: value };
    });
  };

  const handleUpdatedPrice = (value) => {
    setcurrentEditedItem((prev) => {
      return { ...prev, price: value };
    });
  };

  const handleUpdateTodo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setAllTodos(newToDo);

    if (currentEdit != -1) {
      localStorage.setItem("todolist", JSON.stringify(newToDo));
    }

    setCurrentEdit(-1);
  };

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("todolist"));

    if (saved) {
      setAllTodos(saved);
    }
  }, []);
  return (
    <>
      <h2>ToDo List</h2>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="todo-input-item">
            <label htmlFor="">Book Name</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>

          <div className="todo-input-item">
            <label htmlFor="">Author Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>

          <div className="todo-input-item">
            <label htmlFor="">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="todo-input-item">
            <button onClick={addTodo} type="button" className="primaryBtn">
              Add
            </button>
          </div>
        </div>
        <div className="todo-list">
          {allTodos.length !== 0 &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <>
                    <div key={index} className="edit-wrapper">
                      <input
                        type="text"
                        placeholder="username"
                        onChange={(e) => handleUpdatedName(e.target.value)}
                        value={currentEditedItem.user}
                      />
                      <input
                        type="text"
                        placeholder="bookname"
                        onChange={(e) => handleUpdatedBookname(e.target.value)}
                        value={currentEditedItem.book}
                      />

                      <input
                        type="text"
                        placeholder="auhtorname"
                        onChange={(e) =>
                          handleUpdatedAuthorname(e.target.value)
                        }
                        value={currentEditedItem.author}
                      />

                      <input
                        type="text"
                        placeholder="authorname"
                        onChange={(e) => handleUpdatedPrice(e.target.value)}
                        value={currentEditedItem.price}
                      />

                      <button
                        onClick={handleUpdateTodo}
                        type="button"
                        className="primaryBtn"
                      >
                        Update
                      </button>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div key={index} className="todo-list-item">
                      <h5>{item.user}</h5>
                      <h5>{item.book}</h5>
                      <h5>{item.author}</h5>
                      <h5>{item.price}</h5>
                      <div className="icons">
                        <AiOutlineDelete
                          onClick={() => handleDelete(index)}
                          className="icon delete"
                        />
                        <LiaUserEditSolid
                          onClick={() => handleEdit(index, item)}
                          className="icon edit"
                        />
                      </div>
                    </div>
                  </>
                );
              }
            })}
        </div>
      </div>
    </>
  );
}

export default App;
