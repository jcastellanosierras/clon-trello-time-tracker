import { Task as TaskType } from "@/types"
import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";
import { Ellipsis } from 'lucide-react'
import DropdownMenuOptions from "./DropdownMenuOptions";
import { useEffect, useState } from "react";
import { useBoardsStore } from "@/utils/boards";

type Props = {
  task: TaskType;
}

const Task = ({ task }: Props) => {
  const { updateTask, removeTask } = useBoardsStore()
  const [title, setTitle] = useState<string>(task.title)
  const [remove, setRemove] = useState<boolean>(false)

  useEffect(() => {
    // actualizar tarea
    updateTask({
      ...task,
      title
    })
  }, [title])

  useEffect(() => {
    if (!remove) return

    // eliminar tarea
    removeTask(task.id)
  }, [remove])

  return (
    <BoardWrapper id={task.id} className="p-2 bg-muted rounded-md text-primary shadow-sm shadow-slate-200">

      <div key={task.id} >
        {task.title}
      </div>

      <BoardOptions className="p-1 hover:bg-slate-200 bg-opacity-60">
        <DropdownMenuOptions
          type="task"
          setTitle={setTitle}
          setRemove={setRemove}
        >
          <Ellipsis size={16} />
        </DropdownMenuOptions>
      </BoardOptions>
    </BoardWrapper>
  )
}

export default Task