"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, UploadCloud, Server, Globe, User } from "lucide-react"
import { motion } from "framer-motion"
import { WriteResponse } from "@/app/api/generated/api"

const steps = [
  { label: "Sending to Glob Node", duration: 8000 },
  { label: "Uploading to Celestia", duration: 5000 },
  { label: "Done", duration: 0 },
]

type WriteAPIResponse = {
  success: boolean
  data?: WriteResponse
  error?: string
}

export function Playground() {
  const [path, setPath] = useState<string>("demo/" + Math.random().toString(36).slice(2, 8))
  const [json, setJson] = useState<string>('{"msg": "Hello from Glob!"}')
  const [loading, setLoading] = useState<boolean>(false)
  const [progressY, setProgressY] = useState<number>(0)
  const [progressX, setProgressX] = useState<number>(0)
  const [progressX2, setProgressX2] = useState<number>(0)

  const handleSubmit = async () => {
    setLoading(true)
    setProgressY(0)
    setProgressX(100)
    setProgressX2(0)

    try {
      const data = JSON.parse(json)
      const res = await fetch("/api/playground-write", {
        method: "POST",
        body: JSON.stringify({ appId: "playground", path, data }),
      })
      const result:WriteAPIResponse = await res.json()

      if (!result.success) throw new Error(result.error || "Unknown error")

      let y = 0
      const yInt = setInterval(() => {
        y += 1
        setProgressY(y)
        if (y >= 100) clearInterval(yInt)
      }, steps[0].duration / 100)
      await new Promise((r) => setTimeout(r, steps[0].duration))

      let x = 0
      const xInt = setInterval(() => {
        x += 1
        setProgressX2(x)
        if (x >= 100) clearInterval(xInt)
      }, steps[1].duration / 100)
      await new Promise((r) => setTimeout(r, steps[1].duration))

      toast.success("✅ Data successfully written to Glob")
    } catch (e: unknown) {
      toast.error("❌ " + (e instanceof Error ? e.message : "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-center">
      {/* Form */}
      <div className="w-full lg:w-9/20 bg-[#111111] border border-white/10 p-6 rounded-xl space-y-4">
        <h3 className="text-white text-lg font-semibold">Write to Glob Playground</h3>
        <Input
          className="text-white"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          disabled={loading}
        />
        <Textarea
          className="text-white min-h-[150px] resize-y"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          disabled={loading}
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#FB5D32] text-black hover:bg-[#cfcfcf] cursor-pointer"
        >
          {loading ? <><Loader2 className="animate-spin mr-2 w-4 h-4" /> Sending...</> : <><UploadCloud className="mr-2 w-4 h-4" /> Send to Glob Node</>}
        </Button>
        <p className="text-xs text-neutral-400">This will write your data directly to a live GlobNode via gRPC.</p>
      </div>

      {/* Animation */}
      <div className="w-full md:w-11/20 relative flex items-center justify-center">
        {/* Vertical: StageBuffer -> GlobNode */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <div className="bg-[#222] p-4 rounded-full">
              <UploadCloud className="w-7 h-7 text-[#3DA2EA]" />
            </div>
            <p className="text-xs text-white mt-1">StageBuffer</p>
          </div>

          <div className="relative h-[80px] sm:h-[130px] w-1 bg-white/10 my-4">
            <motion.div
              style={{ height: `${progressY}%` }}
              className="absolute bottom-0 left-0 w-full from-[#FB5D32] bg-gradient-to-t to-[#3DA2EA] rounded-full"
            />
          </div>

          {/* Horizontal: You -> Celestia */}
          <div className="flex items-center flex-wrap justify-center gap-3">

            <div className="flex flex-col items-center gap-1">
              <div className="bg-[#222] p-4 rounded-full">
                <User className="w-7 h-7 text-[#e2e2e2]" />
              </div>
              <p className="text-xs text-white mt-1">You</p>
            </div>

            <div className="relative h-1 w-[80px] sm:w-[130px] mx-2 sm:mx-4 bg-white/10 -mt-5">
              <motion.div
                style={{ width: `${progressX}%` }}
                className="absolute left-0 top-0 h-full from-[#e2e2e2] to-[#FB5D32] bg-gradient-to-r rounded-full"
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="bg-[#222] p-4 rounded-full">
                <Server className="w-7 h-7 text-[#FB5D32]" />
              </div>
              <p className="text-xs text-white mt-1">GlobNode</p>
            </div>

            <div className="relative h-1 w-[80px] sm:w-[130px] mx-2 sm:mx-4 bg-white/10 -mt-5">
              <motion.div
                style={{ width: `${progressX2}%` }}
                className="absolute left-0 top-0 h-full from-[#FB5D32] bg-gradient-to-r to-[#9056F5] rounded-full"
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="bg-[#222] p-4 rounded-full">
                <Globe className="w-7 h-7 text-[#9056F5]" />
              </div>
              <p className="text-xs text-white mt-1">Celestia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}