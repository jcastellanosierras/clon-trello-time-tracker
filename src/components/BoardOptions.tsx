import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BoardOptions = ({ children, ...rest }: Props) => {
  const { className } = rest
  
  return (
    <div className={cn(
      "invisible board-options",
      "cursor-pointer hover:bg-muted p-1 rounded-sm",
      className
    )}>
      {children}
    </div>
  )
}

export default BoardOptions
