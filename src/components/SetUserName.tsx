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
import { useUserStore } from "@/utils/user"
import { ReactNode, useState } from "react"

type Props = {
  children: ReactNode;
  defaultOpen?: boolean;
}

const SetUserName = ({ children, defaultOpen = false }: Props) => {
  const { user, setUser } = useUserStore()
  const [newName, setNewName] = useState(user ?? '')
  const [open, setOpen] = useState(defaultOpen)

  const handleChangeName = () => {
    if (newName) {
      setUser(newName)
      setOpen(false)
    } 
  }

  const handleTrigger = () => {
    setOpen(true)
  }

  const handleOpenChange = () => {
    if (!user || user.length === 0) {
      setOpen(true)
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger onClick={handleTrigger} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={newName}
              className="col-span-3"
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          {user && user.length > 0 && (
            <Button variant={'destructive'} onClick={() => setOpen(false)}>Cancel</Button>
          )}
          <Button onClick={handleChangeName} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SetUserName