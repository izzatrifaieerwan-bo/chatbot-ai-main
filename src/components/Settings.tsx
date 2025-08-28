
import { Box, Typography, Slider, TextField } from '@mui/material';

interface SettingsProps {
  settings: {
    temperature: number;
    top_p: number;
    top_k: number;
  };
  setSettings: (settings: any) => void;
}

const Settings = ({ settings, setSettings }: SettingsProps) => {
  const handleSliderChange = (name: string) => (event: any, value: number | number[]) => {
    setSettings({ ...settings, [name]: value });
  };

  const handleInputChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [name]: Number(event.target.value) });
  };

  return (
    <Box>
      <Typography variant="h6">Settings</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>Temperature</Typography>
        <Slider
          value={settings.temperature}
          onChange={handleSliderChange('temperature')}
          aria-labelledby="temperature-slider"
          valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0}
          max={1}
        />
        <TextField
          value={settings.temperature}
          onChange={handleInputChange('temperature')}
          type="number"
          inputProps={{ step: 0.1, min: 0, max: 1 }}
          fullWidth
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>Top P</Typography>
        <Slider
          value={settings.top_p}
          onChange={handleSliderChange('top_p')}
          aria-labelledby="top-p-slider"
          valueLabelDisplay="auto"
          step={0.1}
          marks
          min={0}
          max={1}
        />
        <TextField
          value={settings.top_p}
          onChange={handleInputChange('top_p')}
          type="number"
          inputProps={{ step: 0.1, min: 0, max: 1 }}
          fullWidth
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>Top K</Typography>
        <Slider
          value={settings.top_k}
          onChange={handleSliderChange('top_k')}
          aria-labelledby="top-k-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={100}
        />
        <TextField
          value={settings.top_k}
          onChange={handleInputChange('top_k')}
          type="number"
          inputProps={{ step: 1, min: 1, max: 100 }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default Settings;
