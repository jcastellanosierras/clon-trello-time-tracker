import { Theme } from "@/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import ThemeOption from "./ThemeOption";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { themes } from '@/consts'

const SetBoardTheme = ({ open, setOpen, setTheme }: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTheme: Dispatch<SetStateAction<Theme>>;
}) => {
  const [themeAux, setThemeAux] = useState<Theme>()

  useEffect(() => {
    if (!themeAux) return

    setTheme(themeAux)
    setOpen(false)
  }, [themeAux])

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Theme</DialogTitle>
          <DialogDescription asChild>
            <div className="py-4 flex flex-wrap justify-center">
              {themes.map(themeOption => (
                <ThemeOption key={themeOption.id} setTheme={setThemeAux} themeOption={themeOption} />
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button
              type="button"
              className="px-4 py-2 rounded-md hover:bg-red-600 bg-destructive text-primary-foreground font-medium"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SetBoardTheme
