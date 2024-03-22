import { useUserStore } from "@/utils/user"
import BoardOptions from "./BoardOptions"
import BoardWrapper from "./BoardWrapper"
import SetUserName from "./SetUserName"
import { Avatar } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { FolderKanban, Plus, Pencil } from 'lucide-react'
import DialogAddBoard from "./DialogAddBoard"
import { useBoardsStore } from "@/utils/boards"
import { NavLink } from "react-router-dom"

const Aside = () => {
  const { user } = useUserStore()
  const { boards } = useBoardsStore()

  return (
    <aside id="aside" className="w-full bg-muted h-full">
      <div id="name" className="flex items-center pl-4 h-20">
        <Avatar>
          <div className="w-full h-full bg-foreground text-background flex items-center justify-center font-medium text-2xl">
            {user && user?.length > 0 && user[0].toUpperCase()}
          </div>
        </Avatar>
        
        <div className="p-4 flex flex-col">
          <BoardWrapper id="edit-name">
            <h2 className="text-xl font-bold">{user}</h2>
            <BoardOptions>
              <SetUserName>
                <Pencil size={12} />
              </SetUserName>
            </BoardOptions>
          </BoardWrapper>
          <span className="text-xs italic">Gratis</span>
        </div>

      </div>

      <Separator />

      <div id="boards">
        <div id="title" className="p-4">
          <BoardWrapper id="board-title">
            <div className="flex gap-1">
              <FolderKanban />
              <h2 className="font-medium">Tableros</h2>
            </div>
          
            <BoardOptions>
              <DialogAddBoard>
                <Plus />
              </DialogAddBoard>
            </BoardOptions>
          </BoardWrapper>
        </div>

        <div className="w-3/4 pl-4">
          <Separator />
        </div>

        <div id="boards-container" className="flex flex-col py-4">
          {boards && boards.map(board => (
            <div key={board.id} className="hover:bg-slate-300 hover:bg-opacity-60">
              <BoardWrapper id={`board-${board.id}`}>
                <NavLink 
                  className={
                    ({ isActive }) => isActive
                      ? "px-4 py-1 w-full h-full bg-slate-300 bg-opacity-60"
                      : "px-4 py-1 w-full h-full"
                  }
                  to={`/board/${board.id}`}
                >
                  {board.title}
                </NavLink>
              </BoardWrapper>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Aside
