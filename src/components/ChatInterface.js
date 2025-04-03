import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';
import {
  Send,
  Search,
  Schedule,
  Videocam,
  AttachFile,
  MoreVert,
  PriorityHigh
} from '@mui/icons-material';

const MessageArea = styled('div')(({ theme }) => ({
  height: '70vh',
  overflowY: 'auto',
  padding: theme.spacing(2),
}));

const UrgentMessage = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
  borderLeft: `4px solid ${theme.palette.error.main}`,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

const ChatContainer = styled('div')({
  height: 'calc(100vh - 128px)',
  display: 'flex',
  flexDirection: 'column',
});

const ChatSidebar = styled('div')(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  height: '100%',
}));

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      text: 'Hey team, just checking in on the project timeline',
      time: '10:30 AM',
      priority: 'normal',
    },
    {
      id: 2,
      sender: 'You',
      text: "We're on track for the Friday deadline",
      time: '10:32 AM',
      priority: 'normal',
    },
    {
      id: 3,
      sender: 'Sarah Smith',
      text: 'URGENT: Client requested changes to the dashboard design',
      time: '10:35 AM',
      priority: 'urgent',
    },
  ]);

  const [conversations, setConversations] = useState([
    { id: 1, name: 'Project Alpha Team', unread: 2 },
    { id: 2, name: 'Design Team', unread: 0 },
    { id: 3, name: 'John Doe', unread: 0 },
    { id: 4, name: 'Sarah Smith', unread: 1 },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      priority: 'normal',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <Grid container sx={ChatContainer}>
      <Grid item xs={12} md={4} sx={ChatSidebar}>
        <Box p={2}>
          <TextField
            fullWidth
            placeholder="Search conversations..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <List>
          {conversations.map((conversation) => (
            <ListItem button key={conversation.id}>
              <ListItemAvatar>
                <Avatar>{conversation.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={conversation.name}
                secondary={conversation.unread > 0 ? `${conversation.unread} new messages` : ''}
              />
              {conversation.unread > 0 && <Chip label={conversation.unread} color="primary" size="small" />}
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h6">Project Alpha Team</Typography>
              <Typography variant="caption">5 participants</Typography>
            </Grid>
            <Grid item xs>
              <Box display="flex" justifyContent="flex-end">
                <IconButton>
                  <Videocam />
                </IconButton>
                <IconButton>
                  <Schedule />
                </IconButton>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <MessageArea>
          {messages.map((msg) => (
            <Box key={msg.id} component={msg.priority === 'urgent' ? UrgentMessage : 'div'} p={2}>
              <Grid container>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle2" fontWeight="bold">
                      {msg.sender}
                    </Typography>
                    {msg.priority === 'urgent' && <PriorityHigh color="error" fontSize="small" />}
                    <Typography variant="caption" ml={1}>
                      {msg.time}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{msg.text}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </MessageArea>
        <Box sx={{ p: 2, mt: 'auto' }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AttachFile />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Send />}
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChatInterface;
