"use client"

import { useEffect, useState } from "react"
import { MetricsResponse } from "@/app/api/generated/api"

type MetricsAPIResponse = {
  success: boolean
  data?: MetricsResponse
  error?: string
}

const Stats = () => {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null)

  function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B"
    const sizes = ["B", "KiB", "MiB", "GiB", "TiB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const value = bytes / Math.pow(1024, i)
    const rounded = parseFloat(value.toFixed(1))
    return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded} ${sizes[i]}`
  }

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data: MetricsAPIResponse) => {
        if (!data.success) {
          console.error("Failed to fetch metrics:", data.error)
          return
        }
        setMetrics(data.data || null)
      })
      .catch((err) => console.error("Metrics fetch failed", err))
  }, [])

  useEffect(() => {
    if (!metrics) return
    console.log("Metrics data:", metrics)
  }, [metrics])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      <div className="bg-[#111111] border border-white/10 px-6 pt-3 pb-5 flex flex-col gap-2 sm:gap-3 text-center md:text-left">
        <p className="text-sm sm:text-md text-neutral-400 mt-1 uppercase">
          Total <span className="text-[#FB5D32]">Blobs</span>
        </p>
        <h3 className="text-3xl sm:text-4xl font-bold">{metrics?.totalBlobs ?? "-"}</h3>
      </div>
      <div className="bg-[#111111] border border-white/10 px-6 pt-3 pb-5 flex flex-col gap-2 sm:gap-3 text-center md:text-left">
        <p className="text-sm sm:text-md text-neutral-400 mt-1 uppercase">
          Total <span className="text-[#FB5D32]">Data</span>
        </p>
        <h3 className="text-3xl sm:text-4xl font-bold">{metrics?.totalBlobSize ? formatBytes(metrics.totalBlobSize) : "-"}</h3>
      </div>
      <div className="bg-[#111111] border border-white/10 px-6 pt-3 pb-5 flex flex-col gap-2 sm:gap-3 text-center md:text-left">
        <p className="text-sm sm:text-md text-neutral-400 mt-1 uppercase">
          Active <span className="text-[#FB5D32]">Nodes</span>
        </p>
        <h3 className="text-3xl sm:text-4xl font-bold">2</h3>
      </div>
    </div>
  )
}

export default Stats