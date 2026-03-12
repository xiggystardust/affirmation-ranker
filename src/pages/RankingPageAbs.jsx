import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import RankingList from '../components/RankingList'
import { useAffirmations } from '../hooks/useAffirmations'
import { submitRankingResults } from '../services/resultsService'

import boat1 from '../assets/boat-sailboat-sailing-svgrepo-com.svg'
import boat2 from '../assets/boat-toy-boat-svgrepo-com.svg'
import cloud from '../assets/cloud-svgrepo-com.svg'
import fish0 from '../assets/fish-svgrepo-com.svg'
import fish1 from '../assets/fish-svgrepo-com (1).svg'
import fish2 from '../assets/fish-svgrepo-com (2).svg'
import fish3 from '../assets/fish-svgrepo-com (3).svg'
import fish4 from '../assets/fish-svgrepo-com (4).svg'
import fish5 from '../assets/fish-svgrepo-com (5).svg'
import fishSchool from '../assets/fishes-fish-svgrepo-com.svg'
import octopus from '../assets/octopus-svgrepo-com.svg'
import shark from '../assets/shark-svgrepo-com.svg'
import squid from '../assets/squid-svgrepo-com.svg'

const SURVEY_ID = 'march-2026'
const SURFACE_PCT = 14  // % from top where sky meets ocean

const CREATURE_ASSETS = [fish0, fish1, fish2, fish3, fish4, fish5, fishSchool, octopus, squid]
const BOAT_ASSETS = [boat1, boat2]

function rand(min, max) { return min + Math.random() * (max - min) }

function RankingPage() {
  const navigate = useNavigate()
  const { affirmations } = useAffirmations(SURVEY_ID, 5)
  const [allRated, setAllRated] = useState(false)
  const [cardScores, setCardScores] = useState(() =>
    affirmations.reduce((acc, card) => { acc[card.id] = 50; return acc }, {})
  )
  const startTimeRef = useRef(null)

  // Make body transparent so ocean background shows through; disable scrolling
  useEffect(() => {
    document.body.style.background = 'transparent'
    document.body.style.overflow = 'hidden'
    startTimeRef.current = Date.now()
    return () => {
      document.body.style.background = ''
      document.body.style.overflow = ''
    }
  }, [])

  const creatures = useMemo(() =>
    Array.from({ length: 12 }, () => ({
      src: CREATURE_ASSETS[Math.floor(Math.random() * CREATURE_ASSETS.length)],
      x: rand(2, 90),
      y: rand(SURFACE_PCT + 4, 92),
      size: rand(28, 80),
      flip: Math.random() > 0.5,
      opacity: rand(0.5, 0.95),
    }))
  , [])

  const boats = useMemo(() =>
    Array.from({ length: 4 }, () => ({
      src: BOAT_ASSETS[Math.floor(Math.random() * 2)],
      x: rand(3, 85),
      size: rand(45, 80),
    }))
  , [])

  const clouds = useMemo(() =>
    Array.from({ length: 4 }, () => ({
      x: rand(2, 85),
      y: rand(0.5, 4),
      size: rand(40, 65),
    }))
  , [])

  const handleScoreChange = (id, score) => {
    setCardScores(prev => ({ ...prev, [id]: score }))
  }

  const handleSubmit = () => {
    const duration = startTimeRef.current ? Date.now() - startTimeRef.current : 0
    const rankingData = affirmations.map(card => ({ ...card, score: cardScores[card.id] }))
    submitRankingResults(rankingData, duration, SURVEY_ID)
    navigate('/success', { state: { ranking: rankingData, duration } })
  }

  return (
    <>
      {/* Ocean background — fixed, full viewport */}
      <Box sx={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: -1, overflow: 'hidden',
        background: `linear-gradient(to bottom,
          #dde8f2 0%,
          #c2d6e8 ${SURFACE_PCT - 2}%,
          #5a8898 ${SURFACE_PCT}%,
          #3d6878 ${SURFACE_PCT + 6}%,
          #274858 45%,
          #162530 100%)`,
      }}>
        {/* Surface foam line */}
        <Box sx={{
          position: 'absolute', left: 0, right: 0,
          top: `${SURFACE_PCT}%`, height: 3,
          background: 'rgba(255,255,255,0.55)',
        }} />

        {/* Clouds */}
        {clouds.map((c, i) => (
          <img key={`c${i}`} src={cloud} alt="" style={{
            position: 'absolute',
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.size, opacity: 0.8,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Boats — sitting on surface */}
        {boats.map((b, i) => (
          <img key={`b${i}`} src={b.src} alt="" style={{
            position: 'absolute',
            left: `${b.x}%`,
            top: `${SURFACE_PCT}%`,
            transform: 'translateY(-88%)',
            width: b.size,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Sea creatures */}
        {creatures.map((c, i) => (
          <img key={`f${i}`} src={c.src} alt="" style={{
            position: 'absolute',
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.size, opacity: c.opacity,
            transform: c.flip ? 'scaleX(-1)' : 'none',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Fixed shark — bottom right corner, only top half visible */}
        <img src={shark} alt="" style={{
          position: 'absolute',
          right: '1%', bottom: 0,
          width: 220, opacity: 0.9,
          transform: 'translateY(40%)',
          pointerEvents: 'none',
        }} />
      </Box>

      {/* Game content */}
      <RankingList
        affirmations={affirmations}
        cardScores={cardScores}
        onScoreChange={handleScoreChange}
        onAllRated={() => setAllRated(true)}
        surfacePct={SURFACE_PCT}
      >
        <Button variant="outlined" onClick={() => navigate('/')}
          sx={{ bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)' }}>
          Back
        </Button>
        {allRated && (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </RankingList>
    </>
  )
}

export default RankingPage
