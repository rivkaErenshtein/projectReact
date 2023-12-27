import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const NewPost = ({ userId, open, onClose, onAddPost }) => {
  const [postTitle, setPostTitle] = useState(''); // משתנה לאחסון כותרת הפוסט החדש
  const [postContent, setPostContent] = useState(''); // משתנה לאחסון תוכן הפוסט החדש
  const [titleError, setTitleError] = useState(false); // משתנה לטיפול בשגיאת כותרת
  const [contentError, setContentError] = useState(false); // משתנה לטיפול בשגיאת תוכן

  const handleTitleChange = (event) => {
    setPostTitle(event.target.value);
    setTitleError(false); // איפוס שגיאת הכותרת לאחר שינוי בשדה
  };

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
    setContentError(false); // איפוס שגיאת התוכן לאחר שינוי בשדה
  };

  const handleAddPost = () => {
    if (postTitle.trim() === '') {
      setTitleError(true); // סימון שגיאת כותרת אם הכותרת ריקה
      return;
    }

    if (postContent.trim() === '' || postContent.length < 5) {
      setContentError(true); // סימון שגיאת תוכן אם התוכן ריק או פחות מ-5 תווים
      return;
    }

    const newPost = {
      id: Date.now(),
      title: postTitle,
      content: postContent,
    };

    onAddPost(newPost); // הוספת הפוסט החדש על ידי קריאה לפונקציה שהועברה כפרופרטי
    setPostTitle(''); // איפוס ערך הכותרת
    setPostContent(''); // איפוס ערך התוכן
    onClose(); // סגירת הדיאלוג
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
        {/* שדה הכותרת */}
        <TextField
          label="Post Title"
          value={postTitle}
          onChange={handleTitleChange}
          fullWidth
          style={{ marginBottom: '16px' }}
          error={titleError} // הצגת שגיאת כותרת אם הערך true
          helperText={titleError ? "Title cannot be empty" : ""} // הצגת הודעת שגיאה אם הערך true
        />

        {/* שדה התוכן */}
        <TextField
          label="Post Content"
          value={postContent}
          onChange={handleContentChange}
          fullWidth
          multiline
          minRows={4}
          style={{ marginBottom: '16px' }}
          error={contentError} // הצגת שגיאת תוכן אם הערך true
          helperText={contentError ? "Content must be at least 5 characters long" : ""} // הצגת הודעת שגיאה אם הערך true
        />
      </DialogContent>

      {/* כפתורים */}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddPost} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPost;