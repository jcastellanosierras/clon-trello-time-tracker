import { Task as TaskType } from "@/types"
import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";
import { Ellipsis } from 'lucide-react'

type Props = {
  task: TaskType;
}

const Task = ({ task }: Props) => {
  return (
    <BoardWrapper id={task.id} className="p-2 bg-muted rounded-md text-primary shadow-sm shadow-slate-200">

      <div key={task.id} >
        {task.title}
      </div>

      <BoardOptions className="p-1 hover:bg-muted-foreground">
        <Ellipsis size={16} />
      </BoardOptions>
    </BoardWrapper>
  )
}

export default Task