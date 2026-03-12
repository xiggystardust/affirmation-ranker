import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Typography, Card, CardContent, Button, Stack } from '@mui/material'

const getZoneEmoji = (score) => {
  if (score <= 20) return '🟢'
  if (score <= 40) return '🟡'
  if (score <= 60) return '🟠'
  if (score <= 80) return '🔴'
  return '🚨'
}

const getComment = (total) => {
  if (total >= 80) return 'Smooth sailing. Your ethical radar is well calibrated and you\'re navigating the waters of responsible research with confidence.'
  if (total >= 60) return 'On the right course. You spotted most of the ethical shoals, though a few situations might deserve a closer look.'
  if (total >= 40) return 'Entering choppy waters. Some ethical warning flags may have been missed — time to check the charts and compare notes.'
  if (total >= 20) return 'Danger ahead. Several scenarios approach the rocks of questionable research practice.'
  return 'Abandon ship 🚨. Many of these situations would raise serious concerns about research integrity.'
}

const calcPoints = (playerScore, refScore) => {
  const d = Math.abs(playerScore - refScore)
  const penalty = Math.max(0, Math.ceil((d - 5) / 5))
  return Math.max(0, 20 - penalty)
}

function SuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { ranking = [], duration = 0 } = location.state || {}

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${seconds}s`
  }

  const scoredRanking = [...ranking]
    .sort((a, b) => a.score - b.score)
    .map(item => ({ ...item, points: calcPoints(item.score, item.refScore ?? item.score) }))

  const totalPoints = scoredRanking.reduce((sum, item) => sum + item.points, 0)
  const maxPoints = scoredRanking.length * 20
  // Normalise to 0–100 regardless of how many cards were shown
  const normalised = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0

  return (
    <>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        {/* Left: ranked cards */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom color="primary.dark">
            Your Ranking
          </Typography>
          <Stack spacing={1.5}>
            {scoredRanking.map((item) => (
              <Card key={item.id} variant="outlined" sx={{ bgcolor: 'grey.50' }}>
                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>
                      {getZoneEmoji(item.score)}
                    </Box>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {item.text}
                    </Typography>
                    <Box sx={{
                      flexShrink: 0, minWidth: 36, textAlign: 'right',
                      fontWeight: 700, fontSize: '0.85rem',
                      color: item.points >= 16 ? 'success.main' : item.points >= 8 ? 'warning.main' : 'error.main',
                    }}>
                      {item.points}/20
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Right: score + actions */}
        <Box sx={{ width: 200, flexShrink: 0, pt: 1 }}>
          <Typography variant="h4" fontWeight={700} color="primary.dark">
            {normalised}/100
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            points
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {getComment(normalised)}
          </Typography>
          {duration > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Time: {formatDuration(duration)}
            </Typography>
          )}
          <Button variant="contained" onClick={() => navigate('/rank-abs')} fullWidth>
            Vote Again
          </Button>
        </Box>
      </Box>

      {/* Submission form link */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Have a question, feedback or would like to add a scenario?
        </Typography>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd_Y1cgSh-r-MUabMYbjUkTG2Dy0O2-7HnVvZ5R4j2BLGNQ1w/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#5c6bc0', textDecoration: 'underline', fontWeight: 500 }}
        >
          Use this form
        </a>
      </Box>
    </>
  )
}

export default SuccessPage
