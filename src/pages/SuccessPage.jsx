import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Typography, Card, CardContent, Button, Stack, Paper } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

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

  return (
    <Stack spacing={{ xs: 3, sm: 4 }} alignItems="center">
      <Box sx={{ textAlign: 'center' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: { xs: 60, sm: 80 }, color: 'secondary.main', mb: 2 }} />
        <Typography variant="h1" component="h1" color="primary.dark">
          Thank You!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Thank you for your input!
        </Typography>
      </Box>
      
      {ranking.length > 0 && (
        <Paper elevation={2} sx={{ width: '100%', maxWidth: 500, p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" gutterBottom color="primary.dark">
            Your Ranking
          </Typography>
          <Stack spacing={2}>
            {ranking.map((item) => (
              <Card key={item.id} variant="outlined" sx={{ bgcolor: 'grey.50' }}>
                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      sx={{ 
                        minWidth: { xs: 28, sm: 32 }, 
                        height: { xs: 28, sm: 32 }, 
                        borderRadius: '50%', 
                        bgcolor: item.rank === 1 ? 'success.main' : item.rank === 2 ? 'grey.500' : 'error.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }}
                    >
                      {item.rank}
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      {item.text}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>
      )}

      <Card sx={{ width: '100%', maxWidth: 500 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="body1" color="text.secondary" align="center">
            Your rankings have been submitted successfully. 
            Your input helps us understand which affirmations resonate most deeply.
          </Typography>
          {duration > 0 && (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Time taken: {formatDuration(duration)}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Button 
        variant="contained" 
        onClick={() => navigate('/rank')}
        sx={{ 
          px: { xs: 4, sm: 4 },
          minHeight: 48
        }}
      >
        Vote Again
      </Button>
    </Stack>
  )
}

export default SuccessPage
