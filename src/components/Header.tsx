import { Table2, AlarmClock } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="w-full h-16 bg-foreground text-background flex items-center justify-between p-4 gap-1 shadow-lg">
      <div className='flex gap-1 items-center'>
        <Table2 size={24} />
        <h1 className="font-medium h-full leading-[1.9rem] text-2xl">Trello</h1>
      </div>

      <Link to="/pomodoro" className="flex gap-1 items-center">
        <AlarmClock size={24} />
      </Link>
    </header>
  )
}

export default Header
