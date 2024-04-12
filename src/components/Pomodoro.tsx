import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useBoardsStore } from "@/utils/boards";

const PomodoroOptions = {
  '25/5': {
    work: 25 * 60,
    rest: 5 * 60,
    longRest: 15 * 60,
    worksToLongRest: 4
  },
  '50/10': {
    work: 50 * 60,
    rest: 10 * 60,
    longRest: 30 * 60,
    worksToLongRest: 2
  }
}

type PomodoroOptionsType = '25/5' | '50/10'
type ModeType = 'work' | 'rest'

const formatTime = (time: number, setDisplay: Dispatch<SetStateAction<string>>) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const minutesString = minutes < 10 ? `0${minutes}` : minutes
  const secondsString = seconds < 10 ? `0${seconds}` : seconds

  setDisplay(`${minutesString}:${secondsString}`)
}

export default function Pomodoro() {
  const [option, setOption] = useState<PomodoroOptionsType>('25/5')
  const [work, setWork] = useState<number>(PomodoroOptions[option].work)
  const [rest, setRest] = useState<number>(PomodoroOptions[option].rest)
  const [display, setDisplay] = useState<string>('00:00')
  const [mode, setMode] = useState<ModeType>('work')
  const [play, setPlay] = useState<boolean>(false)
  const [list, setList] = useState<string>()
  const workTimes = useRef<number>(0)
  const { boards, trackTime } = useBoardsStore()

  const handlePlay = () => {
    if (!list) return

    setPlay(true)
  }

  const handlePause = () => {
    setPlay(false)
  }

  const handleChangeValue = (value: PomodoroOptionsType) => {
    setOption(value)
  }

  const handleSelectedListChange = (value: string) => {
    setList(value)
  }

  useEffect(() => {
    if (!play) return

    const interval = setInterval(() => {
      if (mode === 'work') {
        setWork(prev => prev - 1)
      } else {
        setRest(prev => prev - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [play])

  useEffect(() => {
    if (mode !== 'work') return
    if (!list) return

    if (work === 0) {
      setMode('rest')
      setPlay(false)
      setWork(PomodoroOptions[option].work)
    }

    if (work !== PomodoroOptions[option].work) {
      trackTime(list, 1)
    }

    formatTime(work, setDisplay)
  }, [work])

  useEffect(() => {
    if (mode !== 'rest') return
    if (!list) return

    if (rest === 0) {
      workTimes.current += 1

      if (
        workTimes.current > 0 &&
        (workTimes.current + 1) % PomodoroOptions[option].worksToLongRest === 0
      ) {
        setRest(PomodoroOptions[option].longRest)
      } else {
        setRest(PomodoroOptions[option].rest)
      }

      setMode('work')
      setPlay(false)
    }

    if (rest !== PomodoroOptions[option].rest) {
      trackTime(list, 1)
    }
    
    formatTime(rest, setDisplay)
  }, [rest])

  useEffect(() => {
    if (mode === 'work') {
      formatTime(work, setDisplay)
    } else {
      formatTime(rest, setDisplay)
    }
  }, [mode])

  useEffect(() => {
    workTimes.current = 0
    setWork(PomodoroOptions[option].work)
    setRest(PomodoroOptions[option].rest)
    formatTime(PomodoroOptions[option].work, setDisplay)
    setMode('work')
 }, [option])

  return (
    <section className="w-full h-full flex flex-col gap-8 items-center justify-center">
      <span>{mode.toUpperCase()} {`#${workTimes.current + 1}`}</span>
      <div className="flex gap-2" id="options">
        <Button onClick={() => handleChangeValue('25/5')} className="hover:bg-slate-300" variant={'outline'}>25/5</Button>
        <Button onClick={() => handleChangeValue('50/10')} className="hover:bg-slate-300" variant={'outline'}>50/10</Button>
      </div>
      <span className="text-9xl font-semibold">{display}</span>
      <div id="action-buttons">
        {!play
          ? (
            <Button disabled={!list} onClick={handlePlay}>Start</Button>
          )
          : (
            <Button onClick={handlePause}>Pause</Button>
          )
        }
      </div>
      <div id="select-list">
        <Label htmlFor="list-to-time">Select a list to assign the time</Label>
        <Select onValueChange={handleSelectedListChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a list" />
          </SelectTrigger>
          <SelectContent>
            {
              boards.map(board => (
                <SelectGroup key={`select-group-${board.id}`}>
                  <SelectLabel>{board.title}</SelectLabel>
                  {
                    board.lists.map(list => (
                      <SelectItem key={`select-list-${list.id}`} value={list.id}>
                        {list.title}
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              ))
            }
          </SelectContent>
        </Select>
      </div>
    </section>
  )
}