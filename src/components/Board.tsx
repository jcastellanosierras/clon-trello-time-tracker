import { Theme, type Board, type List as ListType } from "@/types"
import { Separator } from "./ui/separator";
import List from "./List";
import { Ellipsis, Plus } from 'lucide-react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBoardsStore } from "@/utils/boards";
import { themes } from "@/consts";
import DialogAddList from '@/components/DialogAddList'
import DropdownMenuOptions from "./DropdownMenuOptions";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import Timer from '@/components/Timer'

export type ThemeOptionType = {
  id: Theme;
  component: JSX.Element;
}

const Board = () => {
  const { boards, updateBoard, removeBoard } = useBoardsStore()
  const { boardId } = useParams()
  const [board, setBoard] = useState<Board>(boards.find(board => board.id === boardId)!)
  const [title, setTitle] = useState<string>(board.title)
  const [theme, setTheme] = useState<Theme>(board.theme)
  const [remove, setRemove] = useState<boolean>(false)
  const [drag, setDrag] = useState<boolean>(false)
  const navigate = useNavigate()
  const [listsParent, lists, setLists] = useDragAndDrop<HTMLDivElement, ListType>(
    board.lists,
  )

  useEffect(() => {
    const newBoard = {
      ...board,
      title,
      theme
    }

    setBoard(newBoard)
    updateBoard(newBoard)
  }, [title, theme])

  useEffect(() => {
    updateBoard({
      ...board,
      lists
    })
  }, [lists])

  useEffect(() => {
    if (!remove || !boardId) return

    removeBoard(boardId)
    navigate('/')
  }, [remove])

  useEffect(() => {
    setTitle(board.title)
    setTheme(board.theme)
    setLists(board.lists)
  }, [board])

  useEffect(() => {
    setBoard(boards.find(board => board.id === boardId)!)
  }, [boardId, boards])

  return (
    <>
      <section className="w-full h-full bg-cover relative overflow-hidden">
        {/* Tema */}
        <div className="w-screen h-full absolute">
          {themes.find(themeOption => themeOption.id === theme)?.component}
        </div>

        <div className="absolute top-0 left-0 h-[calc(100vh-9.1rem)] w-full">
          <div
            id="board-header"
            className="w-full h-20 flex items-center justify-between p-4 bg-slate-800 bg-opacity-80 text-primary-foreground"
          >
            <h2 className="pl-4 font-medium text-2xl">{title}</h2>
            <div className="flex gap-4">
              <div className="flex items-center">
                <Timer lists={lists} />
              </div>
              <div className="flex">
                <DropdownMenuOptions
                  type="board"
                  setTitle={setTitle}
                  setTheme={setTheme}
                  setRemove={setRemove}
                >
                  <div className="flex items-center p-1 hover:bg-slate-400 hover:bg-opacity-40 rounded-sm cursor-pointer">
                    <Ellipsis size={24} />
                  </div>
                </DropdownMenuOptions>
              </div>
            </div>

          </div>

          <Separator />

          <div
            id="board-content"
            className="flex gap-4 p-4 overflow-x-scroll h-full w-full"
          >
            <div
              ref={listsParent}
              className="flex gap-4"
            >
              {lists.map(list => (
                <List key={list.id} dragStatus={drag} setDragStatus={setDrag} list={list} boardName={board.title} />
              ))}
            </div>

            <DialogAddList boardId={board.id}>
              <div
                id="add-list"
                className="min-w-52 h-fit bg-primary rounded-lg p-4 flex justify-between text-primary-foreground hover:opacity-50 cursor-pointer gap-2"
              >
                <h3 className="font-semibold">Añadir lista</h3>
                <Plus />
              </div>
            </DialogAddList>
          </div>
        </div>

      </section>
    </>
  )
}

export default Board