const LoginForm = ({handleSubmit, handleUsernameChange, handlePasswordChange, username, password}) => (
    
      <form onSubmit={handleSubmit}>
        <div>
          {/* for labeling input fields for screen readers & coders */}
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
     
  )


  export default LoginForm