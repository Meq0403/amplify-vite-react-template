import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const { user } = useAuthenticator();
  const navigate = useNavigate();

  return (
    <main className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p><strong>Username:</strong> {user?.signInDetails?.loginId}</p>
        <p><strong>Email:</strong> {user?.attributes?.email || 'N/A'}</p>
      </div>
      <button onClick={() => navigate('/')}>Back to Todos</button>
    </main>
  );
}

export default Profile;
