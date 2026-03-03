import { db } from './firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export async function getResultsFromFirestore(surveyId = null) {
  const resultsRef = collection(db, 'results')
  const q = query(resultsRef, orderBy('timestamp', 'desc'))
  
  const snapshot = await getDocs(q)
  let results = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  
  if (surveyId) {
    results = results.filter(r => r.surveyId === surveyId)
  }
  
  return results
}

export async function getSurveyStats(surveyId = null) {
  const results = await getResultsFromFirestore(surveyId)
  
  const uniqueSessions = new Set(results.map(r => r.sessionId))
  
  return {
    totalVotes: results.length,
    uniqueSessions: uniqueSessions.size
  }
}
