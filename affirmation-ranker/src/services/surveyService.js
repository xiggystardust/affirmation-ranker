import affirmationsData from '../data/affirmations.json'

export function getSurveys() {
  return affirmationsData.surveys || []
}

export function getDefaultSurvey() {
  const surveys = getSurveys()
  return surveys.length > 0 ? surveys[0] : null
}

export function getAffirmationsForSurvey(surveyId) {
  const affirmations = affirmationsData.affirmations || []
  
  if (!surveyId) {
    return affirmations
  }
  
  return affirmations.filter(a => a.surveyId === surveyId || !a.surveyId)
}

export function getAllAffirmations() {
  return affirmationsData.affirmations || []
}
