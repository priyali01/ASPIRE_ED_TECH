"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Video, FileText, Search, ArrowRightCircle } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"

type Item = {
  id: string
  type: "article" | "reel" | "blog" | "ebook" | "video"
  title: string
  description: string
  tags: string[]
  image: string
  url?: string
  author?: string
  publishedAt?: string
}

const MOCK: Item[] = [
  {
    id: "r1",
    type: "reel",
    title: "Day in the Life: Junior Dev",
    description: "Short reel showing a day of a junior software engineer.",
    tags: ["career", "day-in-life"],
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&h=600",
    url: "/content/r1",
    author: "ASPIRE Reels",
    publishedAt: "2025-07-12",
  },
  {
    id: "b1",
    type: "blog",
    title: "How to prepare for college interviews",
    description: "Practical tips and a checklist to ace entrance and admission interviews.",
    tags: ["prep", "interviews"],
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&h=600",
    url: "/content/b1",
    author: "ASPIRE Blog",
    publishedAt: "2025-06-30",
  },
  {
    id: "a1",
    type: "article",
    title: "Choosing the right engineering branch",
    description: "Guide to map interests to popular engineering branches.",
    tags: ["engineering", "guidance"],
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&h=600",
    url: "/content/a1",
    author: "ASPIRE Team",
    publishedAt: "2025-06-10",
  },
  {
    id: "v1",
    type: "video",
    title: "Top skills recruiters want",
    description: "Short video: the 5 skills that make candidates stand out.",
    tags: ["skills", "video"],
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&h=600",
    url: "/content/v1",
    author: "Mentor Series",
    publishedAt: "2025-07-01",
  },
  {
    id: "e1",
    type: "ebook",
    title: "Career pathways: 50+ profiles",
    description: "Downloadable e-book covering career options, salaries and study paths.",
    tags: ["ebook", "careers"],
    image: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&h=600",
    url: "/content/e1",
    author: "ASPIRE Learn",
    publishedAt: "2025-05-20",
  },
  // add more as needed
]

export default function ContentHubPage() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState<null | Item["type"]>(null)
  const [tag, setTag] = useState<string | null>(null)
  const [sort, setSort] = useState<"newest" | "popular">("newest")
  const reelsRef = useRef<HTMLDivElement | null>(null)

  const tags = useMemo(() => {
    const s = new Set<string>()
    MOCK.forEach((m) => m.tags.forEach((t) => s.add(t)))
    return Array.from(s)
  }, [])

  const filtered = useMemo(() => {
    let list = MOCK.slice()
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    }
    if (type) list = list.filter((i) => i.type === type)
    if (tag) list = list.filter((i) => i.tags.includes(tag))
    if (sort === "newest") list.sort((a, b) => +new Date(b.publishedAt || 0) - +new Date(a.publishedAt || 0))
    // popularity not in mock; keep placeholder
    return list
  }, [query, type, tag, sort])

  const reels = filtered.filter((i) => i.type === "reel")
  const blogs = filtered.filter((i) => i.type === "blog" || i.type === "article")
  const videos = filtered.filter((i) => i.type === "video")
  const ebooks = filtered.filter((i) => i.type === "ebook")

  const scrollReels = (dir: "left" | "right") => {
    if (!reelsRef.current) return
    const el = reelsRef.current
    const offset = el.clientWidth * 0.7
    el.scrollBy({ left: dir === "left" ? -offset : offset, behavior: "smooth" })
  }

  return (
    <>
      <Sidebar />
      <main className="p-6 ml-64 min-h-screen bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Content Hub</h1>
              <p className="text-muted-foreground">Articles, blogs, reels and resources curated for you</p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <Card className="p-4 mb-6">
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Search articles, reels, blogs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Select onValueChange={(v) => setType(v === "all" ? null : (v as Item["type"]))} value={type ?? "all"}>
                  <SelectTrigger className="min-w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="reel">Reel</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="ebook">E-book</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(v) => setTag(v === "all" ? null : v)} value={tag ?? "all"}>
                  <SelectTrigger className="min-w-[140px]">
                    <SelectValue placeholder="Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    {tags.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(v) => setSort(v as any)} value={sort}>
                  <SelectTrigger className="min-w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="ghost" onClick={() => { setQuery(""); setType(null); setTag(null); setSort("newest") }}>
                  Clear
                </Button>
              </div>
            </div>
          </Card>

          <nav className="flex gap-3 mb-4 sticky top-20 z-10">
            <button className="px-3 py-2 rounded-md bg-white shadow-sm" onClick={() => document.getElementById("reels")?.scrollIntoView({ behavior: "smooth" })}>
              Reels
            </button>
            <button className="px-3 py-2 rounded-md bg-white shadow-sm" onClick={() => document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" })}>
              Blogs & Articles
            </button>
            <button className="px-3 py-2 rounded-md bg-white shadow-sm" onClick={() => document.getElementById("videos")?.scrollIntoView({ behavior: "smooth" })}>
              Videos
            </button>
            <button className="px-3 py-2 rounded-md bg-white shadow-sm" onClick={() => document.getElementById("ebooks")?.scrollIntoView({ behavior: "smooth" })}>
              E-books
            </button>
          </nav>

          <section id="reels" className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold">Reels</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => scrollReels("left")}>Prev</Button>
                <Button variant="outline" onClick={() => scrollReels("right")}>Next</Button>
              </div>
            </div>

            <div ref={reelsRef} className="overflow-x-auto no-scrollbar flex gap-4 pb-3 snap-x snap-mandatory">
              {reels.length ? (
                reels.map((r) => (
                  <Card key={r.id} className="min-w-[280px] shrink-0 snap-start">
                    <div className="w-full h-44 overflow-hidden rounded-md mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-semibold">{r.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{r.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-muted-foreground">{r.author}</div>
                      <a href={r.url} className="inline-flex items-center gap-2 text-sm text-primary">
                        Watch <ArrowRightCircle />
                      </a>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-muted-foreground px-4">No reels found.</div>
              )}
            </div>
          </section>

          <section id="blogs" className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold">Blogs & Articles</h2>
              <p className="text-sm text-muted-foreground">{blogs.length} results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogs.map((b) => (
                <Card key={b.id} className="p-4 hover:shadow-lg transition">
                  <div className="w-full h-36 overflow-hidden rounded-md mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{b.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">{b.author}</div>
                    <a href={b.url} className="text-sm text-primary">Read</a>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="videos" className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold">Videos</h2>
              <p className="text-sm text-muted-foreground">{videos.length} results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((v) => (
                <Card key={v.id} className="p-4 hover:shadow-lg transition flex gap-4">
                  <div className="w-40 h-28 overflow-hidden rounded-md flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.image} alt={v.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{v.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{v.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">{v.author}</div>
                      <a href={v.url} className="text-sm text-primary">Watch</a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="ebooks" className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold">E-books & Guides</h2>
              <p className="text-sm text-muted-foreground">{ebooks.length} results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ebooks.map((e) => (
                <Card key={e.id} className="p-4 hover:shadow-lg transition flex items-center gap-4">
                  <div className="w-28 h-36 overflow-hidden rounded-md flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{e.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{e.description}</p>
                    <a href={e.url} className="text-sm text-primary">Download</a>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
