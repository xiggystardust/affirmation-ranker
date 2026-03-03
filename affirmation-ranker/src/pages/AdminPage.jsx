import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Grid
} from '@mui/material'
import { Refresh as RefreshIcon } from '@mui/icons-material'
import { getSurveys } from '../services/surveyService'
import { getResultsFromFirestore, getSurveyStats } from '../services/adminService'

function AdminPage() {
  const surveys = getSurveys()
  const [selectedSurvey, setSelectedSurvey] = useState('')
  const [results, setResults] = useState([])
  const [stats, setStats] = useState({ totalVotes: 0, uniqueSessions: 0 })
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const surveyId = selectedSurvey || null
      const [resultsData, statsData] = await Promise.all([
        getResultsFromFirestore(surveyId),
        getSurveyStats(surveyId)
      ])
      setResults(resultsData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedSurvey])

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    return new Date(timestamp).toLocaleString()
  }

  const formatRanking = (affirmationIds) => {
    if (!affirmationIds || !Array.isArray(affirmationIds)) return 'N/A'
    return affirmationIds.slice(0, 3).join(', ') + (affirmationIds.length > 3 ? '...' : '')
  }

  const formatDuration = (duration) => {
    if (!duration) return 'N/A'
    const seconds = Math.round(duration / 1000)
    return `${seconds}s`
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Results Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Votes
              </Typography>
              <Typography variant="h3" color="primary">
                {stats.totalVotes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Unique Sessions
              </Typography>
              <Typography variant="h3" color="secondary">
                {stats.uniqueSessions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Select Survey</InputLabel>
              <Select
                value={selectedSurvey}
                label="Select Survey"
                onChange={(e) => setSelectedSurvey(e.target.value)}
              >
                <MenuItem value="">
                  <em>All Surveys</em>
                </MenuItem>
                {surveys.map((survey) => (
                  <MenuItem key={survey.id} value={survey.id}>
                    {survey.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={fetchData}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Results
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : results.length === 0 ? (
            <Typography color="textSecondary" sx={{ py: 4, textAlign: 'center' }}>
              No results found
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Survey</TableCell>
                    <TableCell>Ranking</TableCell>
                    <TableCell>Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.slice(0, 50).map((result) => (
                    <TableRow key={result.id || result.sessionId}>
                      <TableCell>{formatDate(result.timestamp)}</TableCell>
                      <TableCell>{result.surveyId || 'Default'}</TableCell>
                      <TableCell>{formatRanking(result.affirmationIds)}</TableCell>
                      <TableCell>{formatDuration(result.duration)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default AdminPage
