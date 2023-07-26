import { useState, useEffect } from 'react';
import axios from 'axios'
import { Layout, theme, Spin, Button } from 'antd';

const { Content } = Layout;

const UserDisplay = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  
  const fetchRandomUser = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.get('https://randomuser.me/api');
      const userData = response.data.results[0];
      setUser(userData);
      setLoading(false);

      // Save the user data to local storage
      localStorage.setItem('randomUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    await fetchRandomUser();
  };

  useEffect(() => {
    // Check if user data exists in local storage, if not fetch a new user
    const savedUser = localStorage.getItem('randomUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
    } else {
      fetchRandomUser();
    }
  }, [])

  return (
    <Layout className="layout">
      <Content
        style={{
          padding: '50px',
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
            textAlign: 'center',
          }}
        >
          <Content style={{ padding: '24px', minHeight: '280px' }}>
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin size="large" />
                </div>
              ) : (
                <div>
                  {user ? (
                    <div>
                      <img
                        src={user.picture.large}
                        alt="User"
                        style={{
                          width: '150px',
                          height: '150px',
                          borderRadius: '50%',
                          border: '3px solid #ddd',
                        }}
                      />
                      <h2>{`${user.name.first} ${user.name.last}`}</h2>
                      <p>Email: {user.email}</p>
                      <Button 
                        onClick={handleRefresh}
                        type='primary'
                      >Refresh</Button>
                    </div>
                  ) : (
                    <p>No user data available.</p>
                  )}
                </div>
              )}
            </Content>
        </div>
      </Content>
    </Layout>
  );
};

export default UserDisplay;
