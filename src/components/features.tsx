
import { TerminalSquare, GlobeLock, ShieldCheck, ServerCog, Rocket } from "lucide-react";
import { Globe } from "@/components/magicui/globe";
import { cn } from "@/lib/utils";
import { AnimatedBeamMultipleOutputDemo } from "@/components/beam";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import type { COBEOptions } from "cobe";
import { Meteors } from "@/components/magicui/meteors";

const files = [
  {
    name: "farcaster",
    body: `dAppId: farcaster\npath: /users/0x21a/settings\ncommitment: 0xa2f4c1d89b3f44b5f09c1f...\ndata: { theme: "dark", notifications: true, language: "en" }`
  },
  {
    name: "lens-protocol",
    body: `dAppId: lens-protocol\npath: /profiles/handle.eth\ncommitment: 0xb914a22c78c9e993ad67fa...\ndata: { bio: "Building in public", followers: 1204, verified: true }`
  },
  {
    name: "zerion",
    body: `dAppId: zerion\npath: /wallets/0x8c4/balances\ncommitment: 0xc7a1d99e10aa472dd42e9c...\ndata: { eth: "0.045", usdc: "130.22", matic: "240" }`
  },
  {
    name: "mirror",
    body: `dAppId: mirror\npath: /users/0x03/posts/draft\ncommitment: 0x7eaa3c220ef14a388cb83a...\ndata: { title: "Why Decentralized Storage Matters", published: false, tags: ["web3", "storage", "infra"] }`
  },
  {
    name: "arcana-storage",
    body: `dAppId: arcana-storage\npath: /apps/arcana/index\ncommitment: 0xde5a1f992b3d7e50fabb2d...\ndata: { files: 382, usedSpaceMB: 794, lastFlush: "2025-06-07T13:42:00Z" }`
  },
  {
    name: "xmtp",
    body: `dAppId: xmtp\npath: /chats/0x5f2/messages\ncommitment: 0xa38cced491b13f2b1e7b21...\ndata: { messages: 54, lastMessageAt: "2025-06-07T09:15:42Z", pinned: false }`
  },
  {
    name: "safe-global",
    body: `dAppId: safe-global\npath: /safes/0x61e/state\ncommitment: 0xcba0f5dddc9490c21354f8...\ndata: { owners: 3, threshold: 2, pendingTx: 1 }`
  }
];

const SDKCodeBlock = ({ hovered }: { hovered: boolean }) => (
  <div
    className={cn(
      "w-full h-full rounded-xl bg-[#111111] flex justify-center items-center text-[11px] leading-snug font-mono transition-all duration-300 ease-out",
      hovered ? "opacity-100" : "opacity-40"
    )}
  >
    <pre className={`text-[11px] leading-snug text-gray-300 font-mono px-4 py-3 bg-[#111111] rounded-xl border border-white/10 transition-all duration-300 ease-out`}>
      <code className="whitespace-pre">
        <span className="text-gray-500">~/projects/farcaster</span>{'\n'}
        <span className="text-purple-400">import</span> {'{'} <span className="text-white">createGlobApp</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">&quot;glob-sdk&quot;</span>{'\n\n'}
        <span className="text-purple-400">const</span> <span className="text-white">app</span> = <span className="text-purple-400">await</span> <span className="text-white">createGlobApp</span>({'{\n'}
          &nbsp;&nbsp;<span className="text-[#FB5D32]">appId</span>: <span className="text-green-400">&quot;farcaster&quot;</span>,{'\n'}
          &nbsp;&nbsp;<span className="text-[#FB5D32]">signer</span>: <span className="text-white">walletClient</span>{'\n'}
        {'}'});{'\n\n'}
        <span className="text-gray-500">(//) store blob data</span>{'\n'}
        <span className="text-purple-400">await</span> app.write(<span className="text-green-400">&quot;/users/0x21a/settings&quot;</span>, {'{\n'}
          &nbsp;&nbsp;<span className="text-[#FB5D32]">theme</span>: <span className="text-green-400">&quot;dark&quot;</span>,{'\n'}
          &nbsp;&nbsp;<span className="text-[#FB5D32]">notifications</span>: <span className="text-pink-400">true</span>,{'\n'}
          &nbsp;&nbsp;<span className="text-[#FB5D32]">language</span>: <span className="text-green-400">&quot;en&quot;</span>{'\n'}
        {'}'});{'\n'}
      </code>
    </pre>
  </div>
);

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.5,
  mapSamples: 18000,
  mapBrightness: 1.0,
  baseColor: [0.5, 0.5, 0.5],
  markerColor: [0.984, 0.365, 0.196],
  glowColor: [0.1, 0.1, 0.1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

function highlightKeys(text: string) {
  return text.replace(
    /\b(dAppId|path|commitment|data)\b/g,
    '<span class="text-[#FB5D32] font-medium">$1</span>',
  );
}

const features = [
  {
    Icon: ShieldCheck,
    name: "dApp-Owned Security",
    description: "Blobs are signed by your app — only you control access. No more relying on third-party services or trusting the network.",
    href: "https://docs.useglob.io",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: () => <Meteors number={50} className=""/>
  },
  {
    Icon: GlobeLock,
    name: "Censorship Resistant",
    description: "Glob runs on a decentralized peer network with no central authority. Blobs are stored and served by a global network of nodes.",
    href: "https://docs.useglob.io",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: () => <Globe className="ml-auto mr-0" config={GLOBE_CONFIG} />
  },
  {
    Icon: Rocket,
    name: "Fast & Affordable",
    description: "From dev to production in seconds. Writes cost less than $0.001. Reads are free. Glob is built for scale and speed.",
    href: "https://docs.useglob.io",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: () => 
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-[300px] h-[270px] cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-[13px] font-semibold text-gray-900 dark:text-white truncate max-w-[160px]">
                  📄 {f.name}
                </figcaption>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                  {Math.ceil(f.body.length / 2)}B
                </span>
              </div>
            </div>
            <blockquote className="mt-2 max-h-[120px] overflow-hidden text-[11px] leading-snug text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlightKeys(f.body) }}
            />
          </figure>
        ))}
      </Marquee>
  },
  {
    Icon: TerminalSquare,
    name: "Use-Ready SDKs",
    description: "Use intuitive SDKs to store & query blobs with 3 lines of code.",
    className: "col-span-3 lg:col-span-1",
    href: "https://docs.useglob.io",
    cta: "Learn more",
    background: (hovered: boolean) => <div className={`absolute w-full h-[280px] group-hover:scale-105 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]`}><SDKCodeBlock hovered={hovered} /></div>
  },
  {
    Icon: ServerCog,
    name: "Powered by Celestia",
    description: "Glob uses Celestia&rsquo;s data availability layer to ensure your blobs are securely stored, verifiable, and scalable — without reinventing trust.",
    className: "col-span-3",
    href: "https://docs.useglob.io",
    cta: "Learn more",
    background: () => <AnimatedBeamMultipleOutputDemo className="absolute w-[600px] left-auto right-5 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
  },
];

export function Features() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
