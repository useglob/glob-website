# Glob Website

This is the official landing page for **Glob**, a decentralized, censorship-resistant storage protocol built on top of Celestia.

Website: [https://useglob.io](https://useglob.io)

---

## 🧱 Stack

- Framework: [Next.js](https://nextjs.org/)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Deployment: Vercel

---

## 🚀 Development

Install dependencies:

```bash
pnpm install
```

Generate ts file from proto for grpc

```bash
pnpm proto:gen
```

Start the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

---

## 📁 Structure

- `app/` – App directory (Next.js 13+)
- `components/` – Reusable UI components
- `public/` – Static assets
- `lib/` – Utility functions

---

## 📄 License

This project is open-source under the MIT license.
