import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Link,
  Divider,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Stack spacing={{ xs: 3, sm: 4 }} alignItems="center">
      <Typography
        variant="h1"
        component="h1"
        align="center"
        color="primary.dark"
      >
        Affirmation Ranker
      </Typography>

      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h2" component="h2" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Welcome to the Affirmation Ranker! This tool helps you organize and
            prioritize personal affirmations by ranking them according to what
            resonates most with you.
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            You'll be presented with a list of affirmations. Simply drag and
            drop them to arrange them in order of personal significance - your
            most meaningful affirmation at the top.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h2" component="h2" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            1. Click "Start Ranking" to begin
            <br />
            2. Drag affirmations to reorder them
            <br />
            3. Your top choice should be at position 1<br />
            4. Submit when finished
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/rank")}
        sx={{
          px: { xs: 5, sm: 6 },
          py: { xs: 1.5, sm: 1.5 },
          fontSize: { xs: "1rem", sm: "1.1rem" },
          minWidth: 200,
          minHeight: 48,
        }}
      >
        Start Ranking
      </Button>

      <Divider sx={{ width: "100%", maxWidth: 600 }} />

      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h2" component="h2" gutterBottom>
            About This App
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This application was primarily vibe-coded using{" "}
            <Link href="https://kilo.ai/cli" target="_blank" rel="noopener">
              Kilocode
            </Link>{" "}
            (v7.0.33) and the{" "}
            <Link href="https://minimax.io/" target="_blank" rel="noopener">
              MiniMax model
            </Link>{" "}
            (MiniMax-M2.5)
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Link
              href="https://github.com/username/affirmation-ranker"
              target="_blank"
              rel="noopener"
              underline="none"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: "grey.100",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "grey.200",
                    transform: "translateY(-2px)",
                    boxShadow: 1,
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: 32, color: "text.primary" }} />
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight={500}
                >
                  View on GitHub
                </Typography>
              </Box>
            </Link>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h2" component="h2" gutterBottom>
            Authors
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Morgan Fouesneau & Ivelina G. Momcheva
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Department of Data Science - Max Planck Institute for Astronomy
          </Typography>
        </CardContent>
      </Card>

      <Link href="/admin" underline="hover" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
        View Results (Admin)
      </Link>
    </Stack>
  );
}

export default LandingPage;
