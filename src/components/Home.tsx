import { useUserStore } from "@/utils/user"
import { Button } from "./ui/button"
import DialogAddBoard from "./DialogAddBoard"
import { Plus } from "lucide-react"
import { useBoardsStore } from "@/utils/boards"
import { Link } from "react-router-dom"

export default function Home() {
  const { user } = useUserStore()
  const { boards } = useBoardsStore()

  return (
    <section className="w-full h-full p-8 flex flex-col gap-6">
      <h2 className="font-bold text-4xl">Home de {user}</h2>
      <article className="flex flex-col gap-4">
        <h3 className="font-semibold text-2xl">Boards</h3>

        <DialogAddBoard>
          <Button>
            <Plus size={24} />
            <span>Add board</span>
          </Button>
        </DialogAddBoard>

        <div className="flex flex-col">
          {boards.map(board => (
            <Link
              key={board.id}
              to={`/board/${board.id}`}
              className="hover:text-slate-500 text-lg"
            >
              {board.title}
            </Link>
          ))}
        </div>
      </article>
    </section>
  )
}