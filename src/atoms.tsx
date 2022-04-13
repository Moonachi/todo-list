import { atom, selector } from "recoil";

export const fixedCategory = ["TO DO", "DOING", "DONE"] as const;
export type FixedCategory = typeof fixedCategory[number];

export type Categories = string;

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categorysState = atom<Categories[]>({
  key: "categorys",
  default: (() => {
    const lsCategory = localStorage.getItem("categorys");
    const categorys = lsCategory ? JSON.parse(lsCategory) : [...fixedCategory];

    const willAdd: string[] = [];
    fixedCategory.forEach(item => {
      if (categorys.includes(item)) return;
      willAdd.push(item);
    });

    return [...categorys, ...willAdd];
  })()
});

export const categoryState = atom<Categories>({
  key: "category",
  default: fixedCategory[0]
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: (() => {
    const lsTodoAll = localStorage.getItem("toDos");
    return lsTodoAll ? JSON.parse(lsTodoAll) : [];
  })()
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter(toDo => toDo.category === category);
  }
});
