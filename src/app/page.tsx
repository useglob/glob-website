"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { Features } from "@/components/features";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Stats from "@/components/stats";
import { Playground } from "@/components/playground";
import Image from "next/image";

const PHASE_GRADIENT_COLORS: Record<string, string> = {
  spark: "from-[#00f7d5] to-[#11e9fd]",
  ember: "from-[#ff9442] to-[#ffc76b]",
  flare: "from-[#ffc542] to-[#ff6b6b]",
  nova: "from-[#6478ff] to-[#8f85ff]",
}

const PHASE_HOVER_BORDER_COLORS: Record<string, string> = {
  spark: "hover:border-[#00f7d5]",
  ember: "hover:border-[#ff9442]",
  flare: "hover:border-[#ffc542]",
  nova: "hover:border-[#b3b6ff]",
}

const PHASE_BORDER_COLORS: Record<string, string> = {
  spark: "border-[#00f7d5]",
  ember: "border-[#7D5C26]",
  flare: "border-[#ff4646]",
  nova: "border-[#6658ff]",
}

type Phase = {
  id: string
  title: string
  isCurrent?: boolean
  completed?: boolean
  description: string
  goals: string[]
}

const phases: Phase[] = [
  {
    id: "spark",
    title: "SPARK",
    isCurrent: true,
    description: "Initial MVP phase for internal and private testing.",
    goals: [
      "Blob uploads & trie index",
      "Stage buffer commitment logic",
      "P2P relay layer (MVP)",
      "Local metrics support"
    ]
  },
  {
    id: "ember",
    title: "EMBER",
    description: "Developer-oriented Devnet with faucet, CLI, and partial staking.",
    goals: [
      "Staking activation",
      "Early operator dashboard",
      "Blob validity slashing",
      "Open SDK access"
    ]
  },
  {
    id: "flare",
    title: "FLARE",
    description: "Public testnet with incentivized operators and protocol economics.",
    goals: [
      "Proof of throughput",
      "Node incentives test",
      "Indexer replication",
      "Celestia-scale stress test"
    ]
  },
  {
    id: "nova",
    title: "NOVA",
    description: "Mainnet launch. Full permissionless Glob layer live on Celestia.",
    goals: [
      "Mainnet deployment",
      "Blob economy goes live",
      "Token launch",
      "Full staking + slashing"
    ]
  }
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="dark relative min-h-screen pt-28 bg-[#111111] text-white overflow-x-hidden font-anton">
        {/* Vertical Grid Lines */}
        <div className="absolute inset-0 h-[100vh] z-0 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="vgrid" width="390" height="100" patternUnits="userSpaceOnUse">
                <path d="M 0 0 V 100" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vgrid)" />
          </svg>
        </div>

        {/* Hero Section */}
        <section
          id="hero"
          className="relative w-full max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2.0rem,7vw,5rem)] font-black leading-tight tracking-tight whitespace-pre-line mt-10 mb-8 text-center md:text-left"
          >
            Decentralized Storage{"\n"}for the{" "}
            <span className="inline-flex items-center justify-center md:justify-start gap-2 text-[#7b2bf9]">
              Modular
              <Image
                className="inline-block sm:w-[100px] sm:h-[100px]"
                src="/celestia.png"
                alt="Celestia"
                width={50}
                height={50}
              />
            </span>{" "}
            Web
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-400 max-w-3xl sm:max-w-4xl mb-10 text-center md:text-left"
          >
            Join our censorship-resistant blob layer where anyone — from dApp builders
            to protocol devs — can harness scalable, verifiable data storage powered by
            Celestia.
          </motion.p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mb-12">
            <Button
              disabled
              className="bg-white text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-neutral-200 active:scale-95 transition-transform cursor-pointer"
            >
              Start Building
            </Button>
            <Button
              onClick={() => window.open("https://docs.useglob.io", "_blank")}
              className="bg-transparent border border-white/20 text-white px-5 sm:px-6 py-2.5 sm:py-3 hover:text-[#FB5D32] hover:bg-white/10 active:scale-95 transition-transform cursor-pointer"
            >
              View Docs
            </Button>
            <Button
              onClick={() => window.open("https://x.com/useglob", "_blank")}
              className="bg-transparent border border-white/20 text-white px-5 sm:px-6 py-2.5 sm:py-3 hover:text-[#FB5D32] hover:bg-white/10 active:scale-95 transition-transform cursor-pointer"
            >
              Join Community
            </Button>
          </div>

          {/* Stats */}
          <Stats />
        </section>

        <section id="features" className="relative max-w-7xl w-full mx-auto mt-32 z-10">
          <Features />
        </section>

        <section
          id="demo"
          className="relative flex max-w-7xl w-full h-[700px] sm:h-[750px] md:h-[800px] mx-auto mt-32 sm:mt-40 z-10 overflow-y-hidden px-4 sm:px-6"
        >
          {/* Orbiting Circles */}
          <OrbitingCircles
            radius={390}
            className="absolute right-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-max"
          />
          <OrbitingCircles
            radius={600}
            reverse
            className="absolute right-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-max"
          />

          {/* Title + Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 text-center z-20 px-4"
          >
            <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold tracking-tight uppercase">
              Watch & Try The Demo
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 sm:mt-4 max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              See how Glob started its journey. Try the prototype powered by blob storage & Celestia.
            </p>
          </motion.div>

          {/* Video Dialog */}
          <HeroVideoDialog
            className="block w-full max-w-[90%] sm:max-w-2xl md:max-w-3xl absolute mt-8 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/ju2h3QB7-f8?si=qXYnK10RbJDUd3vJ"
            thumbnailSrc="/glob_banner.png"
            thumbnailAlt="Hero Video"
          />
        </section>
        
        <section className="max-w-6xl mx-auto px-4">
          <Playground />
        </section>

        <section id="roadmap" className="relative max-w-6xl w-full mx-auto mt-48 z-10 text-center px-4">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Roadmap
          </motion.h3>
          <p className="text-neutral-400 text-sm mb-16 max-w-2xl mx-auto">
            Our roadmap outlines the key phases and goals for the Glob protocol, from initial MVP to mainnet launch.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-10 lg:gap-x-32 text-start relative z-10">
            {[phases[0], phases[1], phases[3], phases[2]].map((phase) => (
              <div
                key={phase.id}
                className={`w-full bg-[#111111] border rounded-xl px-8 pb-8 pt-6 ${PHASE_HOVER_BORDER_COLORS[phase.id]} ${
                  phase.isCurrent ? PHASE_BORDER_COLORS[phase.id] : "border-neutral-800"
                } backdrop-blur-sm text-white text-sm shadow-md transition-transform duration-300`}
              >
                <div className="flex items-center gap-2 h-[50px]">
                  <div className={`w-5 h-3 rounded-full bg-gradient-to-r ${PHASE_GRADIENT_COLORS[phase.id]}`} />
                  <p className="text-base font-bold tracking-wide">{phase.title}</p>
                  {phase.completed ? (
                    <span className="ml-auto text-[10px] px-2 py-0.5 bg-green-800 text-green-300 rounded-full">Done</span>
                  ) : phase.isCurrent ? (
                    <span className="ml-auto text-[10px] px-2 py-0.5 bg-yellow-900 text-yellow-300 rounded-full">Now</span>
                  ) : null}
                </div>
                <p className="text-xs text-neutral-300 mb-4 leading-snug">{phase.description}</p>
                <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1">
                  {phase.goals.map((goal, i) => (
                    <li key={i}>{goal}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="call-to-action" className="relative max-w-5xl w-full mx-auto mt-48 z-10 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-white"
          >
            <SparklesText>We&rsquo;re <span className="text-[#FB5D32]">raising</span> — let&rsquo;s build the blob future together</SparklesText>
          </motion.h3>
          <p className="text-neutral-400 text-sm mt-8 mb-6 max-w-xl mx-auto">
            If you&rsquo;re an investor, ecosystem partner, or just curious — we&rsquo;d love to hear from you.
          </p>

          <Button onClick={() => {window.open("mailto:team@useglob.io")}} className="bg-white text-black font-semibold px-6 py-3 hover:bg-neutral-200 cursor-pointer active:scale-95 transition-transform">
            Contact Us
          </Button>
        </section>

        <footer id="footer" className="w-full relative overflow-hidden mt-24 pb-12">
          <FlickeringGrid className="absolute inset-0 opacity-80 bg-transparent [mask-image:linear-gradient(to_bottom,transparent_20%,#000_100%)]" color="#FB5D32 "/>
          <div className="max-w-7xl justify-between flex mx-auto gap-10 px-[20px] mt-24 text-sm text-neutral-400">
            {/* Left: Branding */}
            <div>
              <div className="flex items-center gap-1">
                <Image width={20} height={20} src="/glob-white.png" alt="" />
                <h2 className="text-white text-lg font-bold">Glob</h2>
              </div>
              <p className="mt-2 max-w-xs">
                A modular data layer for the decentralized web. With Celestia underneath.
              </p>
            </div>

            {/* Right: Social / Legal */}
            <div className="text-right mt-auto mb-0">
              <p>&copy; {new Date().getFullYear()} Glob Protocol</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
