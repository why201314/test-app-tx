import React, { useState } from 'react';
import { HttpManager } from './api';
import { useNavigate } from 'react-router-dom';
interface LoginPageProps {
  onLogin: (username: string) => void; // Define the type for the onLogin prop
}

interface ResponseBody {
  code: number;
  success: boolean;
  message: string;
  type: string;
  data?: any;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 防止默认表单提交行为
  
    // 创建一个包含用户名和密码的参数对象
    const params = {
      username: username,
      password: password
    };
  
    try {
      // 发送登录请求
      const response = await HttpManager.login(params) as ResponseBody;
      console.log(response.code)
      // 检查响应，如果登录成功，则调用 onLogin 回调函数
      if (response.code === 200) {
        console.log('登录成功:', response.data);
        navigate('/contact');
      } else {
        // 处理其他响应状态码，比如 401 未授权等
        setError('登录失败，请检查用户名和密码。');
      }
    } catch (error) {
      // 处理异常情况，比如网络错误等
      console.error('登录失败:', error);
      setError('登录失败，请稍后重试。');
    }
  };
  


  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
