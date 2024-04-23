import { ThemeOptionType } from "./components/Board";
import { 
  Lumiflex,
  Novatrix,
  Opulento,
  Tranquiluxe,
  Velustro
} from 'uvcanvas'

export const themes: ThemeOptionType[] = [
  {
    id: 'lumiflex',
    component: <Lumiflex />,
  },
  {
    id: 'novatrix',
    component: <Novatrix />,
  },
  {
    id: 'velustro',
    component: <Velustro />,
  },
  {
    id: 'opulento',
    component: <Opulento />,
  
  },
  {
    id: 'tranquiluxe',
    component: <Tranquiluxe />,
  },
  {
    id: 'none',
    component: <></>,
  }
]
