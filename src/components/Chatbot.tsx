
import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import Settings from './Settings';
import { getChatbotResponse } from '../services/openai';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [settings, setSettings] = useState({
    temperature: 0.7,
    top_p: 1,
    top_k: 50,
  });

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { role: 'user', content: input }];
      setMessages(newMessages);
      setInput('');
      const botResponse = await getChatbotResponse(newMessages, settings);
      setMessages([...newMessages, { role: 'assistant', content: botResponse }]);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: '300px', p: 2, borderRight: '1px solid #ccc' }}>
        <Settings settings={settings} setSettings={setSettings} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Paper sx={{ flex: 1, p: 2, overflowY: 'auto', mb: 2 }}>
          {messages.map((msg, index) => (
            <Box key={index} sx={{ mb: 1, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
              <Typography variant="body1">
                <strong>{msg.role === 'user' ? 'You' : 'Chatbot'}</strong>: {msg.content}
              </Typography>
            </Box>
          ))}
        </Paper>
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;
