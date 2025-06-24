// app/api/stats/route.ts
import { NextResponse } from 'next/server'
import { GlobNodeClient, MetricsRequest, MetricsResponse } from "@/app/api/generated/api"
import { credentials } from "@grpc/grpc-js"

const GLOB_IP = process.env.NEXT_GLOB_IP as string
const client = new GlobNodeClient(GLOB_IP, credentials.createInsecure())

export async function GET(): Promise<Response> {
  const request: MetricsRequest = {}

  return new Promise((resolve) => {
    client.metrics(request, (err, response: MetricsResponse) => {
      if (err || !response) {
        console.error("gRPC Metrics error:", err)
        return resolve(NextResponse.json({ success: false, error: err?.message }))
      }
      return resolve(NextResponse.json({
        success: true,
        data: response,
      }))
    })
  })
}