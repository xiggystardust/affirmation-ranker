import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'

const STORAGE_KEY = 'affirmation_ranking_results'
const APP_VERSION = '1.0'

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export async function submitRankingResults(affirmationIds, duration, surveyId = null) {
  const result = {
    sessionId: generateUUID(),
    timestamp: new Date().toISOString(),
    affirmationIds,
    duration,
    version: APP_VERSION,
    surveyId
  }

  try {
    await addDoc(collection(db, 'results'), result)
    return result
  } catch (error) {
    console.error('Failed to save results:', error)
    throw error
  }
}

export function getAllResults() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to read results:', error)
    return []
  }
}

export function clearResults() {
  localStorage.removeItem(STORAGE_KEY)
}
