import React, { useEffect, useState, useRef } from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TopRatedPage from "./pages/TopRatedPage"
import UpcomingPage from "./pages/UpcomingPage"
import MovieDetailPage from "./pages/MovieDetailPage"
import SearchPage from "./pages/SearchPage"
import NotFoundPage from "./pages/NotFounfPage"
import { addListener, launch, stop } from "devtools-detector"

function App() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false)
  const [checkingDetector, setCheckingDetector] = useState(true)
  const isDevToolsOpenRef = useRef(false)

  // Keep the ref in sync with state
  useEffect(() => {
    isDevToolsOpenRef.current = isDevToolsOpen
  }, [isDevToolsOpen])

  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e) => {
      e.preventDefault()
    }
    window.addEventListener("contextmenu", handleContextMenu)

    // 2. Disable Keyboard Shortcuts for DevTools / View Source
    const handleKeyDown = (e) => {
      if (e.key === "F12") {
        e.preventDefault()
      }
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")
      ) {
        e.preventDefault()
      }
      if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
        e.preventDefault()
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    // 3. DevTools Detector Integration
    const handler = (isOpen) => {
      window.isDevToolsOpen = isOpen
      if (isOpen) {
        setIsDevToolsOpen(true)
      } else {
        // If DevTools is closed, check if it was previously open.
        // If so, force reload the page to clear states and display the app contents.
        if (isDevToolsOpenRef.current) {
          window.location.reload()
        } else {
          setIsDevToolsOpen(false)
        }
      }
      // Stop blocking routes rendering after initial check
      setCheckingDetector(false)
    }

    addListener(handler)
    launch()

    const fallbackTimeout = setTimeout(() => {
      setCheckingDetector(false)
    }, 250)

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu)
      window.removeEventListener("keydown", handleKeyDown)
      clearTimeout(fallbackTimeout)
      stop()
    }
  }, [])

  if (checkingDetector) {
    return (
      <div className="page-loading-container">
        <div className="spinner"></div>
        <p>Loading database...</p>
      </div>
    )
  }

  if (isDevToolsOpen) {
    return <NotFoundPage />
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/toprated" element={<TopRatedPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/movieDetails/:id" element={<MovieDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App

