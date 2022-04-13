import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  categorysState,
  categoryState,
  FixedCategory,
  fixedCategory,
  toDoState
} from "../atoms";

function ToDoCategoryList() {
  const [categorys, setCategorys] = useRecoilState(categorysState);
  const setCategory = useSetRecoilState(categoryState);
  const [toDos, setToDos] = useRecoilState(toDoState);

  return (
    <div>
      <h2> - 카테고리 리스트</h2>
      <p style={{ color: "red", fontWeight: "bold", marginBottom: 10 }}>
        카테고리 삭제 시 해당 카테고리 내 항목 모두 삭제됩니다.
      </p>
      <ul>
        {categorys.map(item => {
          return (
            <li key={item}>
              <span>{item}</span>{" "}
              <span>
                {(() => {
                  let count = 0;
                  toDos.forEach(el => {
                    if (el.category === item) count += 1;
                  });
                  return count;
                })()}{" "}
                개
              </span>
              {!fixedCategory.includes(item as FixedCategory) && (
                <button
                  onClick={() => {
                    const confirm = window.confirm("정말 삭제하시겠습니까?");

                    if (!confirm) return;
                    const newCategorys = categorys.filter(el => el !== item);
                    setCategorys(newCategorys);

                    const newToDoAll = toDos.filter(el => el.category !== item);
                    setToDos(newToDoAll);

                    setCategory(fixedCategory[0]);
                  }}
                >
                  삭제하기
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ToDoCategoryList;
