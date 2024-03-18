import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import DialogBoardDelete from "./DialogBoardDelete"
import DialogBoardTheme from "./DialogBoardTheme"
import DialogBoardTitle from "./DialogBoardTitle"
import { Theme } from "@/types"

type DropdownMenuBoardOptionsProps = {
  type: 'board',
  setTitle: Dispatch<SetStateAction<string>>,
  setTheme: Dispatch<SetStateAction<Theme>>,
  setRemove: Dispatch<SetStateAction<boolean>>,
  children: ReactNode
}

type DropdownMenuListAndTaskOptionsProps = {
  type: 'list' | 'task',
  setTitle: Dispatch<SetStateAction<string>>,
  setRemove: Dispatch<SetStateAction<boolean>>,
  children: ReactNode
}

type Props = DropdownMenuBoardOptionsProps | DropdownMenuListAndTaskOptionsProps

const DropdownMenuOptionsMap = {
  board: 'Board',
  list: 'List',
  task: 'Task',
}

const DropdownMenuOptions = (props: Props) => {
  const [titleMenuOpen, setTitleMenuOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [removeMenuOpen, setRemoveMenuOpen] = useState(false)
  
  return (
    <>
      {
        props.type === 'board' && (
          <DialogBoardTheme open={themeMenuOpen} setOpen={setThemeMenuOpen} setTheme={props.setTheme} />
        )
      }
      <DialogBoardTitle open={titleMenuOpen} setOpen={setTitleMenuOpen} setTitle={props.setTitle} />
      <DialogBoardDelete open={removeMenuOpen} setOpen={setRemoveMenuOpen} setDelete={props.setRemove} />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {props.children}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {DropdownMenuOptionsMap[props.type]}
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setTitleMenuOpen(true)} className="cursor-pointer">
            Rename
          </DropdownMenuItem>
          {
            props.type === 'board' && (
              <DropdownMenuItem onClick={() => setThemeMenuOpen(true)} className="cursor-pointer">
                Change Theme
              </DropdownMenuItem>
            )
          }
          <DropdownMenuItem onClick={() => setRemoveMenuOpen(true)} className="cursor-pointer">
            <span className="text-destructive">Remove</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default DropdownMenuOptions