import { Board as BoardType, List as ListType } from "@/types";
import { create } from "zustand";

type BoardsStore = {
  boards: BoardType[];
  addBoard: (board: BoardType) => void;
  setBoard: (board: BoardType) => void;
  removeBoard: (boardId: string) => void;
  addList: (boardId: string, list: ListType) => void;
}

const saveToLocalStorage = (boards: BoardType[]) => {
  localStorage.setItem('boards', JSON.stringify(boards))
}

export const useBoardsStore = create<BoardsStore>((set) => ({
  boards: JSON.parse(localStorage.getItem('boards') || '[]') as BoardType[],
  addBoard: (board) => set(({ boards }) => {
    const newBoards = boards.concat(board)

    saveToLocalStorage(newBoards)

    return { boards: newBoards }
  }),
  setBoard: (board) => set(({ boards }) => {
    const oldBoardIndex = boards.findIndex(item => board.id === item.id)

    if (oldBoardIndex === -1) return { boards }

    const newBoards = [...boards]
    newBoards[oldBoardIndex] = board

    saveToLocalStorage(newBoards)

    return { boards: newBoards }
  }),
  removeBoard: (boardId) => set(({ boards }) => {
    const newBoards = boards.filter(board => board.id !== boardId)

    saveToLocalStorage(newBoards)

    return { boards: newBoards }
  }),
  addList: (boardId, list) => set(({ boards }) => {
    const boardIndex = boards.findIndex(board => board.id === boardId)

    if (boardIndex === -1) return { boards }

    const newBoards = [...boards]

    newBoards[boardIndex].lists.push(list)

    saveToLocalStorage(newBoards)

    return { boards: newBoards }
  })
}))