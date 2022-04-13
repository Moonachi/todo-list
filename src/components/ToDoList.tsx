import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categorysState,
  categoryState,
  toDoSelector,
  toDoState
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import ToDoCategoryList from "./ToDoCategoryList";

interface ICustomCategory {
  category: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const toDosAll = useRecoilValue(toDoState);
  const [categorys, setCategorys] = useRecoilState(categorysState);
  const [category, setCategory] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<ICustomCategory>();

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const handleValid = ({ category }: ICustomCategory) => {
    if (categorys.includes(category)) {
      alert("이미 있는 카테고리 입니다.");
    } else if (!category.length) {
      alert("입력되지 않았습니다.");
    } else {
      setCategorys(prev => [...prev, category]);
      alert("카테고리 추가되었습니다.");
      setValue("category", "");
    }
  };

  useEffect(() => {
    localStorage.setItem("categorys", JSON.stringify(categorys));
  }, [categorys]);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDosAll));
  }, [toDosAll]);

  return (
    <div>
      <h1>To Dos</h1>
      <p>대소문자를 구분하지 않습니다.</p>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("category", {
            required: "Please write a To Do"
          })}
          placeholder="Write a new category"
        />
        <button>Add</button>
      </form>
      <hr />

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <select value={category} onInput={onInput}>
            {categorys.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <CreateToDo />

          {toDos?.map(toDo => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <ToDoCategoryList />
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
