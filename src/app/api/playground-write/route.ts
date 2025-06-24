import { NextRequest, NextResponse } from "next/server"
import { Buffer } from "buffer"
import { toBytes } from "viem"
import { signAsync } from "@noble/secp256k1"
import { createHash } from "crypto"

import { GlobNodeClient, WriteRequest } from "@/app/api/generated/api"
import { credentials } from "@grpc/grpc-js"

const PRIVATE_KEY = process.env.NEXT_PRIVATE_KEY as string
const GLOB_IP = process.env.NEXT_GLOB_IP as string

const client = new GlobNodeClient(GLOB_IP, credentials.createInsecure())

const ipRequestMap = new Map<string, number[]>()
const MAX_CALLS = 5
const WINDOW_MS = 30 * 60 * 1000

export async function POST(req: NextRequest): Promise<Response> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"
  const now = Date.now()

  const timestamps = ipRequestMap.get(ip) || []
  const filtered = timestamps.filter((t) => now - t < WINDOW_MS)

  if (filtered.length >= MAX_CALLS) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait." },
      { status: 429 }
    )
  }

  filtered.push(now)
  ipRequestMap.set(ip, filtered)

  const body = await req.json()
  const { appId, path: userPath, data: userData } = body

  const appID: string = appId ?? "playground"
  const pathVal: string = userPath ?? "demo/anon"
  const dataStr = typeof userData === "string" ? userData : JSON.stringify(userData)
  const dataBytes = new TextEncoder().encode(dataStr)

  if (dataBytes.length > 500) {
    return NextResponse.json(
      { success: false, error: "Data exceeds 1000 bytes." },
      { status: 413 }
    )
  }
  
  try {
    const message = Buffer.concat([
      Buffer.from(appID + pathVal),
      dataBytes
    ])

    const hash = createHash("sha256").update(message).digest()
    const { r, s, recovery } = await signAsync(hash, PRIVATE_KEY)

    const rBytes = toBytes(r, { size: 32 })
    const sBytes = toBytes(s, { size: 32 })
    const v = new Uint8Array([recovery])

    const signature = new Uint8Array(65)
    signature.set(rBytes, 0)
    signature.set(sBytes, 32)
    signature.set(v, 64)

    const request: WriteRequest = {
      appId: appID,
      path: pathVal,
      data: dataBytes,
      signature: signature,
    }

    return new Promise((resolve) => {
      client.write(request, (error, response) => {
        if (error || !response) {
          return resolve(
            NextResponse.json({ success: false, error: error?.message || "Unknown error" })
          )
        }

        resolve(NextResponse.json({ success: true, message: response.message }))
      })
    })
  } catch (err) {
    return NextResponse.json({ success: false, error: err })
  }
}