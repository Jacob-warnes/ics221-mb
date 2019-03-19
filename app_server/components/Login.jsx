const React = require('react');

class Login extends React.Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleText = this.handleText.bind(this);
        this.register = this.register.bind(this);
        this.state ={
            email:"" ,
            password:"" };
    }
    handleText(event){
        if(event.target.id == 'email'){
            this.setState({
                email: event.target.value
            });
        } else{
            this.setState({
                password: event.target.value
            });

        }
        console.log(this.state);

    }
    login(event){
        event.preventDefault();
        // pass control to MsgBoard and send
        // the email and pass the user entered
        this.props.loginCallback({
            email: this.state.email,
            password: this.state.password
        });
    }
    register(event){
        this.props.registerCallback()
    }
    render(){
        let loginFailText;

        if (this.props.loginFail) {
        loginFailText = <p className="card-text pt-1 text-danger">Failed Login Attempt.
            &nbsp;{ this.props.loginAttempts } attempts remaining.</p>
        }

        return(
            <div>
            <div>
              <h4>Login to post a Message:</h4>
                <form onSubmit={this.login}>
                <div>
                  <label>
                    Email:
                  </label>
                  <div>
                    <input
                      id="email"
                      type="email"
                      onChange={this.handleText}
                    />
                  </div>
                </div>
                <div>
                  <label>
                    Enter Password:
                  </label>
                  <div>
                    <input
                      id="password"
                      type="password"
                      onChange={this.handleText}
                    />
                  </div>
                </div>
                <div>
                    <div>
                        <input type="submit" value="Login"></input>
                    </div>
                </div>
               
                
              </form>
              {loginFailText}
              <div>
                    <lable>
                        Not registered?
                    </lable>
                    <div>
                        <button type="button" onClick ={this.register}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
          </div>
        )
    }

}
module.exports = Login