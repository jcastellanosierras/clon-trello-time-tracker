import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBoardsStore } from "@/utils/boards"
import { DialogClose } from "@radix-ui/react-dialog"
import { ReactNode, useState } from "react"

type Props = {
  children: ReactNode;
  boardId: string;
}

const DialogAddList = ({ children, boardId }: Props) => {
  const { addList } = useBoardsStore()
  const [name, setName] = useState<string>('')

  const handleAddList = () => {
    addList(boardId, {
      id: crypto.randomUUID(),
      title: name,
      tasks: [],
      time: 0
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add List</DialogTitle>
          <DialogDescription>
            Add list to your board. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'destructive'}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleAddList} type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogAddList