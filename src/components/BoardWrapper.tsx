import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: React.ReactNode;
}

const handleMouseEnter = (id: string) => {
  const target = document.getElementById(id)
  
  const options = target?.getElementsByClassName('board-options')
  
  if (!options) return

  for (const option of options) {
    option.classList.remove('invisible')
  }
}

const handleMouseLeave = (id: string) => {
  const target = document.getElementById(id)
 
  const options = target?.getElementsByClassName('board-options')
  
  if (!options) return

  for (const option of options) {
    option.classList.add('invisible')
  }
}

const BoardWrapper = ({ id, children, ...rest }: Props) => {
  const { className } = rest
  
  return (
    <div
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={() => handleMouseLeave(id)}
      onBlur={() => handleMouseLeave(id)}
      id={id}
      className={cn("board-wrapper flex justify-between items-center", className)}
    >
      {children}
    </div>
  )
}

export default BoardWrapper