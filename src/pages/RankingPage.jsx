import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, Stack, Paper, IconButton } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import RankingList from '../components/RankingList'
import { useAffirmations } from '../hooks/useAffirmations'
import { submitRankingResults } from '../services/resultsService'

const SURVEY_ID = 'spring2026'

function RankingPage() {
  const navigate = useNavigate()
  const { affirmations, randomizeOrder } = useAffirmations(SURVEY_ID)
  const [currentOrder, setCurrentOrder] = useState(() => randomizeOrder(affirmations))
  const startTimeRef = useRef(null)

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [])

  const handleReorder = (newOrder) => {
    setCurrentOrder(newOrder)
  }

  const handleSubmit = () => {
    const endTime = Date.now()
    const duration = startTimeRef.current ? endTime - startTimeRef.current : 0
    
    const rankingData = currentOrder.map((affirmation, index) => ({
      ...affirmation,
      rank: index + 1
    }))

    const affirmationIds = currentOrder.map(a => a.id)
    submitRankingResults(affirmationIds, duration, SURVEY_ID)

    navigate('/success', { state: { ranking: rankingData, duration } })
  }

  return (
    <Stack spacing={{ xs: 3, sm: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton 
          onClick={() => navigate('/')}
          color="primary"
          aria-label="view instructions"
          sx={{ mr: 1 }}
        >
          <InfoOutlinedIcon />
        </IconButton>
      </Box>
      
      <Typography variant="h1" component="h1" align="center" color="primary.dark">
        Rank the Scenarios
      </Typography>
      
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2, px: 1 }}>
        Arrange these AI use cases from <strong>most acceptable (1)</strong> to <strong>least acceptable (3)</strong>
      </Typography>

      <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, bgcolor: 'grey.50', borderRadius: 2 }}>
        <RankingList 
          affirmations={currentOrder} 
          onReorder={handleReorder}
        />
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/')}
          sx={{ minWidth: { xs: 100, sm: 120 }, minHeight: 48 }}
        >
          Back
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          sx={{ minWidth: { xs: 100, sm: 120 }, minHeight: 48 }}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  )
}

export default RankingPage
