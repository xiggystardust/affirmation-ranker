# Affirmation Ranker

A mobile-friendly web application for ranking affirmations from least to most acceptable. Results are collected anonymously for statistical analysis.

## Features

- **Mobile-friendly** Material Design UI
- **Drag-and-drop** sorting of 5 random affirmations
- **Anonymous** result collection (stored in Firebase Firestore)
- **Multiple surveys** support
- **Admin dashboard** to view and export results as CSV

## Tech Stack

- React + Vite
- Material-UI (MUI)
- Firebase Firestore (database)
- Netlify (hosting)

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Deployment

The site is deployed on Netlify. Push to main branch to deploy automatically.

## Survey Management

### Adding a New Survey

1. Edit `src/data/affirmations.json`
2. Add a new survey entry:

```json
{
  "surveys": [
    { "id": "pilot-2026", "name": "Pilot Survey 2026" },
    { "id": "survey-2027", "name": "Survey 2027" }
  ],
  "affirmations": [...]
}
```

3. Update the hardcoded `SURVEY_ID` in `src/pages/RankingPage.jsx`

### Ranking Scale

Range: 0 to 100

0 = "Seems totally fine"

>80 = "Alarm bells ringing / completely unacceptable"

## Admin Access

The admin page is at `/admin` and allows:
- Viewing all survey results
- Filtering by survey
- Exporting data as CSV

## Authors

- Morgan Fouesneau
- Ivelina G. Momcheva

Max Planck Institute for Astronomy
Department of Data Science

- Sarah Burke-Spolaor
West Virginia University;
Johns Hopkins University

## Acknowledgments

This application was primarily vibe-coded using [Kilocode](https://kilo.ai/cli) (v7.0.33) and the [MiniMax model](https://minimax.io/) (MiniMax-M2.5).

## License

Copyright (c) 2026 Max Planck Institute for Astronomy. See [LICENSE](LICENSE) for details.
