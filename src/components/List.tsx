import { List as ListType, Task as TaskType } from "@/types"
import BoardOptions from "./BoardOptions";
import BoardWrapper from "./BoardWrapper";
import { Separator } from "./ui/separator";
import { Ellipsis, Plus } from 'lucide-react'
import Task from "./Task";
import { useDragAndDrop } from '@formkit/drag-and-drop/react'

type Props = {
  list: ListType;
  boardName: string;
}

const List = ({ list, boardName }: Props) => {
  const [todoList, todos] = useDragAndDrop<HTMLDivElement, TaskType>(
    list.tasks,
    {
      group: boardName
    }
  )

  return (
    <div key={list.id} className="h-fit p-4 bg-primary rounded-lg text-primary-foreground min-w-52 shadow-sm shadow-slate-800">
      <div className="flex flex-col gap-2">
        <BoardWrapper id={`list-name-${list.id}`}>
          <h3 className="font-semibold">{list.title}</h3>
          <BoardOptions className="p-0">
            <Ellipsis className="w-full h-full hover:text-primary p-1" size={18} />
          </BoardOptions>
        </BoardWrapper>
        <Separator />
        <div ref={todoList} id={`list-${list.id}-tasks`} className="flex flex-col gap-2">
          {todos.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </div>

        <div className="mt-2">
          <BoardWrapper id={`options-list-${list.id}`}>
            <div className="w-full flex items-center justify-between gap-4">
              <h4 className="font-medium">Añadir tarea</h4>

              <BoardOptions className="p-0">
                <Plus className="w-full h-full hover:text-primary p-1" />
              </BoardOptions>
            </div>
          </BoardWrapper>
        </div>
      </div>
    </div>
  )
}

export default List
