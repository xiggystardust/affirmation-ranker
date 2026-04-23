import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Typography, Card, CardContent, Button, Stack } from '@mui/material'

const getZoneEmoji = (score) => {
  if (score <= 20) return '🟢'
  if (score <= 40) return '🟡'
  if (score <= 60) return '🟠'
  if (score <= 80) return '🔴'
  return '🚨'
}

function SuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { ranking = [] } = location.state || {}

  const sortedRanking = [...ranking].sort((a, b) => a.score - b.score)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 4 }, alignItems: 'flex-start' }}>
        {/* Left: ranked cards */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom color="primary.dark">
            Your Ranking
          </Typography>
          <Stack spacing={1.5}>
            {sortedRanking.map((item) => (
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
                      color: 'text.secondary',
                    }}>
                      {item.score}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Right: thank you + actions */}
        <Box sx={{ width: { xs: '100%', sm: 200 }, flexShrink: 0, pt: { xs: 0, sm: 1 } }}>
          <Typography variant="h6" fontWeight={700} color="primary.dark" sx={{ mb: 2 }}>
            Thank you for participating!
          </Typography>
          <Button variant="contained" onClick={() => navigate('/rank-abs')} fullWidth>
            Play Again
          </Button>
        </Box>
      </Box>

      {/* Submission form link */}
	{/*      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Once the group exercise is over you can:
        </Typography>
        <a
            href="/admin" underline="hover"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#5c6bc0', textDecoration: 'underline', fontWeight: 500 }}
        >
          view overall results summary so far.
        </a>
	</Box>*/}
    </>
  )
}

export default SuccessPage
