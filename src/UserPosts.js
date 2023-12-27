import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItemText, CircularProgress, TextField, Button } from '@material-ui/core';
import NewPost from './NewPost';

const UserPosts = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([]); // משתנה לאחסון רשימת הפוסטים של המשתמש
  const [loading, setLoading] = useState(false); // משתנה לטיפול במצב הטעינה
  const [searchTerm, setSearchTerm] = useState(''); // משתנה לאחסון מחרוזת החיפוש
  const [openDialog, setOpenDialog] = useState(false); // משתנה לטיפול בפתיחת/סגירת תיבת הדו-שיח להוספת פוסט
  const [error, setError] = useState(null); // משתנה חדש לטיפול בשגיאות
  const [addPostEnabled, setAddPostEnabled] = useState(true); // משתנה חדש לאפשר/ביטול אפשרות הוספת פוסט

  useEffect(() => {
    setLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => {
        setUserPosts(response.data);
        setLoading(false);
        setError(null); // איפוס השגיאה בתגובה מוצלחת
        setAddPostEnabled(true); // הפעלת אפשרות הוספת פוסט
      })
      .catch(error => {
        console.error('Error fetching user posts:', error);
        setError('Something went wrong. Please try again later.'); // הגדרת הודעת השגיאה
        setLoading(false);
        setAddPostEnabled(false); // ביטול אפשרות הוספת פוסט
      });
  }, [userId]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = userPosts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddPost = (newPost) => {
    setUserPosts(prevPosts => [...prevPosts, newPost]);
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="post-list" >
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        style={{ marginBottom: '16px' }}
      />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p> // הצגת הודעת השגיאה
      ) : (
        <List>
          {filteredPosts.map(post => (
            <ListItemText key={post.id} primary={post.title} />
          ))}
        </List>
      )}
      <Button variant="contained" color="primary" onClick={handleOpenDialog} disabled={!addPostEnabled}>
        Add Post
      </Button>
      <NewPost userId={userId} open={openDialog} onClose={handleCloseDialog} onAddPost={handleAddPost} />
    </div>
  );
};

export default UserPosts;