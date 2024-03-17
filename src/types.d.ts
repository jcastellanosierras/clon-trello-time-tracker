export type Board = {
  id: string;
  title: string;
  lists: List[];
  theme: Theme;
}

export type List = {
  id: string;
  title: string;
  tasks: Task[];
}

export type Task = {
  id: string;
  title: string;
}

export type Theme = 'lumiflex' | 'novatrix' | 'velustro' | 'opulento' | 'tranquiluxe'
