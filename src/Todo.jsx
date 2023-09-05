import { useState } from "react";
import OwnButton from "./OwnButton";
import { TiTick } from "react-icons/ti";
import { BiEditAlt } from "react-icons/bi";
import { MdDarkMode, MdLightMode, MdOutlineDelete } from "react-icons/md";

let isAddlist = true;
let editIndex, mode;
localStorage.theme ? (mode = localStorage.theme) : (mode = "light");
localStorage.theme = mode;

function setMode() {
  mode == "dark"
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
  console.log(mode);
}
setMode();

function CreateUl({ lists, removeList, updateLists, updateInput, editList }) {
  // console.log("runs");
  // const [completed, updateCompleted] = useState([]);
  // console.log(completed);

  function doComplete(completedIndex) {
    if (lists[completedIndex].isComplete)
      lists[completedIndex].isComplete = false;
    else lists[completedIndex].isComplete = true;
    // console.log(lists[completedIndex]);
    // console.log(lists);
    localStorage.setItem("todo", JSON.stringify(lists));
    updateLists([...lists]);

    // if (completedIndex in completed) {
    //   console.log("Yes : ", completedIndex, completed);
    //   const filterComplete = completed.filter((complete) => {
    //     return completedIndex != complete;
    //   });
    //   updateCompleted(filterComplete);
    // } else {
    //   console.log("No : ", completedIndex, " : ", completed);
    //   updateCompleted([...completed, completedIndex]);
    // }
    // console.log(completed);
  }

  const elements = lists.map((list, index) => {
    let tickStyle = "text-green-400 bg-white";
    let midLine;
    if (lists[index].isComplete) {
      tickStyle = "text-white bg-green-400";
      midLine = "midline text-gray-400 dark:text-gray-600";
    }
    let lastBorder =
      "border-b border-black dark:border-b dark:border-slate-200";
    index == lists.length - 1 ? (lastBorder = "") : (lastBorder = lastBorder);

    return (
      <li key={index} className={`${lastBorder} flex justify-between  py-2`}>
        <div
          className="flex cursor-pointer gap-2 overflow-hidden"
          onClick={() => doComplete(index)}
        >
          <button
            className={`w-4.5 h-5 rounded-full border border-green-700 ${tickStyle}  text-center text-lg  transition-all duration-200 hover:scale-105 hover:shadow-sm hover:shadow-green-300 active:scale-100`}
          >
            <TiTick />
          </button>
          <h1
            className={`cursor-pointer select-none whitespace-nowrap  font-medium dark:text-slate-200  ${midLine}`}
          >
            {list.msg}
          </h1>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => editList(index, list)}
            className="rounded border-2 border-purple-600 bg-purple-500 text-xl text-white transition-all duration-200  hover:scale-105 hover:shadow-sm hover:shadow-black active:scale-100"
          >
            <BiEditAlt />
          </button>
          <button
            onClick={() => removeList(index)}
            className="rounded border-2 border-red-700 bg-red-500 text-xl text-white transition-all duration-200 hover:scale-105 hover:shadow-sm hover:shadow-black active:scale-100"
          >
            <MdOutlineDelete />
          </button>
        </div>
      </li>
    );
  });

  return <ul className="">{elements}</ul>;
}

export default function Todo() {
  const [inValue, updateInput] = useState("");

  let lsData = JSON.parse(localStorage.getItem("todo"));
  // console.log(lsData);
  let initialTemlate = { msg: "", isComplete: false };
  // lsData == [] ? (lsData = initialTemlate) : (lsData = lsData);
  if (lsData) lsData = lsData;
  else {
    lsData = [];
    localStorage.todo = JSON.stringify(lsData);
  }

  const [lists, updateLists] = useState(lsData);

  function setInput(e) {
    updateInput(e.target.value);
  }

  function addList() {
    // const listInput = document.querySelector("#listInput");
    if (inValue) {
      initialTemlate.msg = inValue;
      const addedLists = [...lists, initialTemlate];
      updateLists(addedLists);
      localStorage.setItem("todo", JSON.stringify(addedLists));
      updateInput("");
    }
  }

  // function enterKey(e) {
  //   if (e.key == "Enter") addList();
  // }

  function removeList(removeIndex) {
    const filterList = lists.filter((list, index) => {
      return index != removeIndex;
    });
    // console.log(filterList);
    updateLists(filterList);
    localStorage.setItem("todo", JSON.stringify(filterList));
    isAddlist = true;
    updateInput("");
  }

  function editList(index, list) {
    // console.log("inEdit");
    isAddlist = false;
    updateInput(list.msg);
    editIndex = index;
  }

  function addEditList() {
    if (inValue) {
      // console.log(editIndex);
      lists[editIndex].msg = inValue;
      updateLists([...lists]);
      updateInput("");
      localStorage.setItem("todo", JSON.stringify(lists));
      isAddlist = true;
    }
  }

  function toggleMode() {
    mode == "dark" ? (mode = "light") : (mode = "dark");
    localStorage.theme = mode;
    setMode();
    updateLists([...lists]);
  }

  return (
    <section className=" flex h-screen w-screen items-center justify-center dark:bg-gray-950">
      <div className="shado hover:shado-md relative h-4/6 w-5/6 overflow-auto rounded-lg  border-2 border-purple-500 p-2 shadow-black hover:shadow-black md:h-5/6 md:w-2/3">
        <button
          onClick={() => toggleMode()}
          className="absolute right-4 top-4 text-2xl dark:text-slate-200"
        >
          {mode == "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>

        <h1 className="mt-2 p-2 text-center text-3xl font-bold text-purple-600 dark:text-purple-400">
          Todo List
        </h1>
        <div className="mx-auto mt-5 gap-5 px-2 text-center md:w-4/5">
          {isAddlist ? (
            <div className="">
              <label>
                <input
                  onKeyUp={(e) => (e.key == "Enter" ? addList() : "")}
                  onChange={setInput}
                  className="mr-4 w-7/12  rounded-md  border-2 border-purple-500 p-2 text-center outline-none focus:shadow-md focus:shadow-purple-300 dark:bg-slate-100"
                  type="text"
                  name="listInput"
                  id="listInput"
                  placeholder="Add New List"
                  value={inValue}
                />
              </label>
              <OwnButton buttonName={"ADD"} clicked={addList} />
            </div>
          ) : (
            <div className="">
              <label>
                <input
                  onKeyUp={(e) => (e.key == "Enter" ? addEditList() : "")}
                  onChange={setInput}
                  className="mr-4  w-7/12  rounded-md border-2 border-purple-500 p-2 text-center outline-none focus:shadow-md focus:shadow-purple-300 dark:bg-slate-100"
                  type="text"
                  name="listInput"
                  id="listInput"
                  placeholder="Add New List"
                  value={inValue}
                />
              </label>

              <OwnButton buttonName={"Save"} clicked={addEditList} />
            </div>
          )}
          {/* {console.log(lists)} */}
          {lists.length != 0 ? (
            <div className="mt-5 max-h-[21rem] overflow-y-auto rounded border-2 border-purple-500 px-2">
              <CreateUl
                lists={lists}
                removeList={removeList}
                updateLists={updateLists}
                updateInput={updateInput}
                editList={editList}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}
