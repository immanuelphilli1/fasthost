"use client"

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react"

// Scroll input scrubs the film only while this section fills the viewport
// and the playhead is between the start and the end. At either edge the
// page scrolls normally, and scrolling back onto the section scrubs again.
// The body is never pinned.

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  /** Where the Skip control goes. No value, no control. */
  skipHref?: string
  /** Total input distance (px) needed to scrub the full video. Tune to taste. */
  scrubDistance?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_VIDEO = "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4"
const SANS = "ui-sans-serif, system-ui, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "OPEN",
  scrollHint = "SCROLL",
  tagline = "Hosting and SMS were the start. The company is wider now.",
  signature = false,
  skipHref = "#about",
  scrubDistance = 3200,
  className,
  style,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let duration = 0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    let hasStartedScrolling = false
    let isSeeking = false
    let pendingTime: number | null = null
    let touchStartY = 0

    const showEndState = () => {
      targetProgress = 1
      currentProgress = 1
      hasStartedScrolling = true
      if (duration > 0) video.currentTime = duration * 0.92
      if (titleRef.current) titleRef.current.style.opacity = "0"
      if (hintRef.current) hintRef.current.style.opacity = "0"
      if (taglineRef.current) {
        taglineRef.current.style.opacity = "1"
        taglineRef.current.style.transform = "none"
        taglineRef.current.style.filter = "none"
      }
      if (progressBarRef.current) progressBarRef.current.style.transform = "scaleX(1)"
    }

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      if (reduceMotion) showEndState()
    }
    video.addEventListener("loadeddata", onLoadedData)
    if (video.readyState >= 2) onLoadedData()

    // iOS Safari often won't buffer any video data — even with
    // preload="auto" — until playback actually starts, to save mobile
    // data. Since we only ever seek (never call play() elsewhere), the
    // video can stay permanently blank on iPhone. Force a silent
    // play-then-immediately-pause on mount to kick off real loading.
    const kickstartLoad = () => {
      const p = video.play()
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {})
      } else {
        video.pause()
      }
    }
    kickstartLoad()

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        isSeeking = true
        video.currentTime = t
      }
    }
    video.addEventListener("seeked", onSeeked)

    const seekTo = (t: number) => {
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      video.currentTime = t
    }

    const EDGE = 0.02

    const fillsViewport = () => {
      const rect = section.getBoundingClientRect()
      return rect.top < 48 && rect.bottom > window.innerHeight - 48
    }

    const pinToTop = () => {
      const top = section.getBoundingClientRect().top
      if (Math.abs(top) < 1) return
      const root = document.documentElement
      const previous = root.style.scrollBehavior
      root.style.scrollBehavior = "auto"
      window.scrollTo(0, window.scrollY + top)
      root.style.scrollBehavior = previous
    }

    // Capture only while the film fills the screen and the playhead can
    // still move in this direction. At either end the event falls through
    // and the page scrolls.
    function captureDelta(deltaY: number) {
      if (reduceMotion || !fillsViewport()) return false
      if (deltaY > 0 && targetProgress >= 1 - EDGE && currentProgress >= 1 - EDGE) return false
      if (deltaY < 0 && targetProgress <= EDGE && currentProgress <= EDGE) return false
      pinToTop()
      targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
      if (targetProgress > 0.001) hasStartedScrolling = true
      return true
    }

    const onWheel = (event: WheelEvent) => {
      if (!captureDelta(event.deltaY)) return
      event.preventDefault()
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY ?? touchStartY
      const deltaY = touchStartY - y
      touchStartY = y
      if (!captureDelta(deltaY)) return
      event.preventDefault()
    }

    if (!reduceMotion) {
      window.addEventListener("wheel", onWheel, { passive: false })
      window.addEventListener("touchstart", onTouchStart, { passive: true })
      window.addEventListener("touchmove", onTouchMove, { passive: false })
      section.addEventListener("touchstart", onTouchStart, { passive: true, capture: true })
      section.addEventListener("touchmove", onTouchMove, { passive: false, capture: true })
    }

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18

      if (duration > 0) {
        seekTo(currentProgress * duration)
      }

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.06
        videoRef.current.style.transform = `scale(${scale})`
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1"
      }
      if (taglineRef.current) {
        // Mirrors the title's blur-focus treatment, timed as the payoff
        // once the reveal is nearly complete — not a background afterthought.
        const t = clamp((currentProgress - 0.82) / 0.18, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      section.removeEventListener("touchstart", onTouchStart, true)
      section.removeEventListener("touchmove", onTouchMove, true)
      cancelAnimationFrame(rafId)
    }
  }, [scrubDistance])

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        touchAction: "pan-y",
        ...style,
      }}
    >
      {skipHref ? (
        <a
          href={skipHref}
          style={{
            position: "absolute",
            left: "clamp(16px, 3vw, 28px)",
            bottom: "clamp(28px, 6vh, 52px)",
            zIndex: 3,
            color: "rgba(242,244,248,0.82)",
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Skip
        </a>
      ) : null}

      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
          touchAction: "none",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,7,13,0.35), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.55))",
          pointerEvents: "none",
        }}
      />

      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: "clamp(30px, 7vw, 96px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {title}
        </span>
      </div>

      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(20px, 3.4vw, 40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: COL_TEXT,
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {tagline}
          </span>
        </div>
      )}

      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(240,244,248,0.75)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Thin progress line — fills as the video advances. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.95))",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>

      {signature && (
        <span
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            letterSpacing: "0.01em",
            color: "rgba(220,224,232,0.6)",
            zIndex: 2,
          }}
        >
          by{" "}
          <a
            href={signature.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(220,224,232,0.6)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(event: MouseEvent<HTMLAnchorElement>) => {
              event.currentTarget.style.color = COL_TEXT
            }}
            onMouseLeave={(event: MouseEvent<HTMLAnchorElement>) => {
              event.currentTarget.style.color = "rgba(220,224,232,0.6)"
            }}
          >
            {signature.name}
          </a>
        </span>
      )}
    </div>
  )
}
