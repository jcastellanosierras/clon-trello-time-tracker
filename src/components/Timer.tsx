import { List as ListType } from "@/types";
import { Play, Pause, Square } from "lucide-react";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useBoardsStore } from "@/utils/boards";

export default function Timer ({ lists }: {
  lists: ListType[]
}) {
  const [counter, setCounter] = useState(0)
  const [display, setDisplay] = useState<string>('00:00')
  const [play, setPlay] = useState(false)
  const [list, setList] = useState<string>()
  const { trackTime } = useBoardsStore()

  const handlePlay = () => {
    if (!list) return

    setPlay(true)
  }

  const handleStop = () => {
    console.log(list)
    setCounter(0)

    if (!list) return

    trackTime(list, counter)
  }

  const handlePause = () => {
    setPlay(false)
  }

  const handleListChange = (value: string) => {
    setList(value)
  }

  useEffect(() => {
    if (!play) return

    const interval = setInterval(() => {
      setCounter(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [play])

  useEffect(() => {
    const hours = Math.floor(counter / 3600)
    const restSeconds = counter % 3600
    const minutes = Math.floor(restSeconds / 60)
    const seconds = restSeconds % 60

    const hoursString = hours < 10 ? `0${hours}` : hours
    const minutesString = minutes < 10 ? `0${minutes}` : minutes
    const secondsString = seconds < 10 ? `0${seconds}` : seconds

    setDisplay(
      hours === 0
        ? `${minutesString}:${secondsString}`
        : `${hoursString}:${minutesString}:${secondsString}`
    )
  }, [counter])

  return (
    <div className="flex gap-2 items-center">
      <Select onValueChange={handleListChange}>
        <SelectTrigger className="w-[180px] text-card-foreground">
          <SelectValue placeholder="Select list" />
        </SelectTrigger>
        <SelectContent>
          {
            lists.map(list => (
              <SelectItem key={`select-list-${list.id}`} value={list.id}>
                {list.title}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
      <span>{display}</span>
      {
        play
          ? (
            <Pause onClick={handlePause} className="cursor-pointer" size={24} />
          )
          : (
            <>
              <Play onClick={handlePlay} className={list ? 'cursor-pointer' : 'cursor-not-allowed'} size={24} />
              {counter > 0 && 
                <Square onClick={handleStop} className="cursor-pointer" size={24} />
              }
            </>
          )
      }
    </div>
  )
}