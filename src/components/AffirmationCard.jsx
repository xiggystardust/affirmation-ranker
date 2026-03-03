import { Card, CardContent, Chip, Box, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'

function AffirmationCard({ affirmation, showRank = false, rankPosition }) {
  return (
    <Card 
      elevation={2}
      sx={{ 
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Chip 
            label={affirmation.category}
            size="small"
            sx={{ 
              textTransform: 'capitalize',
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              fontWeight: 500,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          />
          {showRank && rankPosition && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                borderRadius: '50%',
                bgcolor: rankPosition === 1 ? 'success.main' : rankPosition === 2 ? 'grey.500' : 'error.main',
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              {rankPosition}
            </Box>
          )}
        </Box>
        <Typography 
          variant="body1" 
          component="div"
          sx={{ 
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            lineHeight: 1.6,
            color: 'text.primary'
          }}
        >
          <ReactMarkdown>{affirmation.text}</ReactMarkdown>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AffirmationCard
