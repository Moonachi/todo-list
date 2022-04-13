import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categorysState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const categorys = useRecoilValue(categorysState);
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1)
      ];
    });
  };

  return (
    <li style={{ margin: 10, padding: 10 }}>
      <span>{text}</span>
      <div>
        {categorys.map(item => {
          if (item === category)
            return <React.Fragment key={item}></React.Fragment>;
          return (
            <button name={item} onClick={onClick} key={item}>
              {item}
            </button>
          );
        })}
      </div>
    </li>
  );
}

export default ToDo;
