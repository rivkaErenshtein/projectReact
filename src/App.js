import React, { useState } from 'react';
import UsersTable from './UsersTable';

const App = () => {
  const [ setSelectedUserId] = useState(null);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  return (      
      <div >
        <div>
          <UsersTable onUserSelect={handleUserSelect} />
        </div>
      </div> 
   
  );
};

export default App;