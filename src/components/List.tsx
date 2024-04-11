import { List as ListType, Task as TaskType } from "@/types"
import BoardOptions from "./BoardOptions";
import BoardWrapper from "./BoardWrapper";
import { Separator } from "./ui/separator";
import { Ellipsis, Plus } from 'lucide-react'
import Task from "./Task";
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { type DNDPlugin, parents, addEvents } from '@formkit/drag-and-drop'
import DropdownMenuOptions from "./DropdownMenuOptions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useBoardsStore } from "@/utils/boards";
import DialogAddTask from "./DialogAddTask";

type Props = {
  list: ListType;
  boardName: string;
  dragStatus: boolean;
  setDragStatus: Dispatch<SetStateAction<boolean>>;
}

const List = ({ list, boardName, dragStatus, setDragStatus }: Props) => {
  const { updateList, removeList } = useBoardsStore()
  const [title, setTitle] = useState<string>(list.title)
  const [remove, setRemove] = useState<boolean>(false)
  
  // Plugin
  const dragStatusPlugin: DNDPlugin = (parent) => {
    const parentData = parents.get(parent);
    if (!parentData) return;
  
    function dragstart() {
      setDragStatus(true);
    }
  
    function dragend() {
      setDragStatus(false);
    }
  
    return {
      setup() {},
      teardown() {},
      setupNode(data) {
        data.nodeData.abortControllers.customPlugin = addEvents(data.node, {
          dragstart: dragstart,
          dragend: dragend,
        });
      },
      tearDownNode(data) {
        if (data.nodeData?.abortControllers?.customPlugin) {
          data.nodeData.abortControllers.customPlugin.abort();
        }
      },
      setupNodeRemap() {},
      tearDownNodeRemap() {},
    };
  };

  const [todoList, todos, setTodos] = useDragAndDrop<HTMLDivElement, TaskType>(
    list.tasks,
    {
      group: boardName,
      plugins: [dragStatusPlugin],
    }
  )
  
  useEffect(() => {
    if (list.tasks.length === todos.length) return

    setTodos(list.tasks)
  }, [list])

  useEffect(() => {
    if (dragStatus) return

    updateList({
      ...list,
      tasks: todos
    })
  }, [dragStatus])

  useEffect(() => {
    // actualizar la lista
    if (!title) return

    if (dragStatus) return

    updateList({
      ...list,
      title
    })
  }, [title]) 

  useEffect(() => {
    //borrar la lista
    if (!remove) return

    removeList(list.id)
  }, [remove])

  return (
    <div key={list.id} className="h-fit p-4 bg-primary rounded-lg text-primary-foreground min-w-52 shadow-sm shadow-slate-800">
      <div className="flex flex-col gap-2">
        <BoardWrapper id={`list-name-${list.id}`}>
          <h3 className="font-semibold">{title}</h3>
          <BoardOptions className="p-0">
            <DropdownMenuOptions
              type="list"
              setTitle={setTitle}
              setRemove={setRemove}
            >
              <Ellipsis className="w-full h-full hover:text-primary p-1" size={18} />
            </DropdownMenuOptions>
          </BoardOptions>
        </BoardWrapper>
        <Separator />
        <div ref={todoList} id={`list-${list.id}-tasks`} className="w-full min-h-2 flex flex-col gap-3">
          {todos.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </div>

        <div className="mt-2">
          <BoardWrapper id={`options-list-${list.id}`}>
            <div className="w-full flex items-center justify-between gap-4">
              <h4 className="font-medium">Añadir tarea</h4>

              <BoardOptions className="p-0">
                <DialogAddTask listId={list.id}>
                  <Plus className="w-full h-full hover:text-primary p-1" />
                </DialogAddTask>
              </BoardOptions>
            </div>
          </BoardWrapper>
        </div>
      </div>
    </div>
  )
}

export default List
