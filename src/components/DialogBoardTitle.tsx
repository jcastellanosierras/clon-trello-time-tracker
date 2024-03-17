import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogHeader, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SetBoardTitle = ({ open, setOpen, setTitle }: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
}) => {
  const [newTitle, setNewTitle] = useState<string>()

  const handleSaveChanges = () => {
    if (!newTitle) return

    setTitle(newTitle)
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Title</DialogTitle>
          <DialogDescription asChild>
            Change the board title.
          </DialogDescription>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setOpen(false)} variant={'destructive'}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSaveChanges} type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SetBoardTitle
