import { Separator } from "@/components/ui/separator"
import Header from "./components/Header"
import Aside from "./components/Aside"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "./lib/utils"
import { useUserStore } from "./utils/user"
import SetUserName from "./components/SetUserName"
import { Outlet } from "react-router-dom"

function App() {
  const { user } = useUserStore()
  const [asideOpen, setAsideOpen] = useState(true)

  if (!user || user.length === 0) {
    return (
      <SetUserName children={null} defaultOpen={true} />
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <div id="header" className="w-full">
        <Header />
      </div>

      <main className="flex w-full h-full grow">
        <div
          id="aside-content"
          className={
            cn(
              "transition-all",
              asideOpen
                ? "w-1/3 lg:w-1/4 xl:w-1/5 relative"
                : "w-[2%] bg-background"
            )
          }
        >
          {asideOpen && <Aside />}
          <div
            className={
                asideOpen
                ? "absolute top-6 left-[96%] z-50 bg-foreground text-background rounded-full flex items-center p-1 hover:bg-slate-700" 
                : "absolute top-[5.6rem] left-[0.6%] lg:left-[0.7%] xl:left-[1%] 2xl:left-[1.2%] z-50 bg-foreground text-background rounded-full flex items-center p-1 hover:bg-slate-700"
              }
          >
            <button
              onClick={() => setAsideOpen(
                asideOpen
                ? false
                : true
              )}
            >
              {asideOpen
                ? <ArrowLeft />
                : <ArrowRight />
              }
            </button>
          </div>
        </div>

        <Separator orientation="vertical" />

        <div
          id="content"
          className={
            asideOpen
              ? "w-2/3 lg:w-3/4 xl:w-4/5"
              : "w-full"
          }
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
