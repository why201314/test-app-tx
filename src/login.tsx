import { useState } from "react";
import {useNavigate  } from 'react-router-dom';


const Login = () => {
const navigate = useNavigate()

  const [form, setForm] = useState({username: '', password: ''});
  const handleChange = (input: string) => (e: { target: { value: any; }; }) => {
    setForm({...form, [input] : e.target.value});
  };

  return (
	
   <div>
      <h2>ログイン</h2>
	  USER
	  <input type="text" value={form.username} onChange={handleChange('username')} />
	  <br /><br />
	  PASSWORD
	  <input type="text" value={form.password} onChange={handleChange('password')} />
	  <br /><br />
      <button onClick={() => navigate('/auth',{state:{user:form.username,pass:form.password},replace : true})}>送信</button>
	</div>

  );
}

export default Login;
