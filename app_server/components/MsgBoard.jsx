const React = require("react");
const MsgList = require("./MsgList.jsx");
const NewMsg = require("./NewMsg.jsx");
const Login = require("./Login.jsx");
const Registration = require("../../client_side/Registration.jsx");

class MsgBoard extends React.Component {
  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.deleteMsgCallback = this.deleteMsgCallback.bind(this);
    this.saveMsgCallback = this.saveMsgCallback.bind(this);
    this.deleteAllMsgCallback = this.deleteAllMsgCallback.bind(this);
    this.state = {
      messages: this.props.messages,
      userCredntials: {
        email: "",
        password: ""
      },
      loginForm: true,
      loginAttempts: 3,
      loginFail: false,
      registrationForm: false,
      registrationFail: false,
      userID: "",
      userName: ""
    };
  }
  componentDidMount() {
    fetch(`${process.env.API_URL}/msgs`)
      .then(response => this.handleHTTPErrors(response))
      .then(response => response.json())
      .then(result => {
        console.log("URL =  " + `${process.env.API_URL}`);
        this.setState({
          messages: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
  }
  addMessage(message) {
    const basicString =
      this.state.userCredentials.email +
      ":" +
      this.state.userCredentials.password;
    // update back-end data
    fetch(`${process.env.API_URL}/msgs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify(message)
    })
      .then(response => this.handleHTTPErrors(response))
      .then(result => result.json())
      .then(result => {
        this.setState({
          messages: [result].concat(this.state.messages)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteAllMsgCallback() {
    const basicString =
      this.state.userCredentials.email +
      ":" +
      this.state.userCredentials.password;
    fetch(`${process.env.API_URL}/msgs`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => {
        // message was deleted
        if (response.status === 200) {
          this.setState({
            messages: []
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteMsgCallback(message) {
    const basicString =
      this.state.userCredentials.email +
      ":" +
      this.state.userCredentials.password;
    fetch(`${process.env.API_URL}/msgs/${message._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => {
        // message was deleted
        if (response.status === 200) {
          let newMessages = this.state.messages.filter(msg => {
            if (msg._id == message._id) {
              return null;
            }
            return msg;
          });
          this.setState({
            messages: newMessages
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  saveMsgCallback(message) {
    const basicString =
      this.state.userCredentials.email +
      ":" +
      this.state.userCredentials.password;
    fetch(`${process.env.API_URL}/msgs/${message._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(basicString)
      },
      body: JSON.stringify(message)
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => {
        // message was deleted
        if (response.status === 200) {
          let newMessages = this.state.messages.filter(msg => {
            if (msg._id == message._id) {
              msg.msg = message.msg;
              return msg;
            }
            return msg;
          });
          this.setState({
            messages: newMessages
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  login(userCredentials) {
    // userCredentials is passed in from Login Component
    // For Basic Authentication it is username:password (but we're using email)
    const basicString = userCredentials.email + ":" + userCredentials.password;
    fetch(`${process.env.API_URL}/users/login`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(basicString)
      }
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => {
        // No more login attempts, throw an error
        if (this.state.loginAttempts === 0) throw "locked out";

        // OK response, credentials accepted
        if (response.status === 200) {
          this.setState({
            userCredentials: userCredentials,
            loginForm: false,
            loginFail: false
          });
          return response;
        } else {
          // Credentials are wrong
          this.setState(state => {
            return {
              loginFail: true,
              loginAttempts: state.loginAttempts - 1
            };
          });
        }
      })
      .then(result => result.json())
      .then(result => {
        this.setState({
          userID: result._id,
          userName: result.username
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  register() {
    this.setState({
      registrationForm: true
    });
  }
  addNewUser(userDetails) {
    fetch(`${process.env.API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails)
    })
      .then(response => this.handleHTTPErrors(response))
      .then(response => {
        if (response.status === 201) {
          // User successfully registered
          // disable the Registration Form
          this.setState({
            registrationForm: false,
            registrationFail: false
          });
        } else {
          // Some Error or User already exists
          this.setState({
            registrationFail: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.registrationForm) {
      let failedRegistration;

      if (this.state.registrationFail) {
        failedRegistration = (
          <p className="text-danger">
            User already Registered or Registration Error.
          </p>
        );
      }

      return (
        <div>
          <Registration registerNewUserCallback={this.addNewUser} />
          {failedRegistration}
        </div>
      );
    } else {
      let form;
      let msgs;
      if (this.state.loginForm) {
        form = (
          <Login
            registerCallback={this.register}
            loginCallback={this.login}
            loginFail={this.state.loginFail}
            loginAttempts={this.state.loginAttempts}
          />
        );
      } else {
        form = (
          <NewMsg
            addMsgCallback={this.addMessage}
            userName={this.state.userName}
          />
        );
      }
      msgs = (
        <MsgList
          messages={this.state.messages}
          userName={this.state.userName}
          deleteMsgCallback={this.deleteMsgCallback}
          saveMsgCallback={this.saveMsgCallback}
          deleteAllMsgCallback={this.deleteAllMsgCallback}
        />
      );
      return (
        <div>
          {form}
          {msgs}
        </div>
      );
    }
  }
}

module.exports = MsgBoard;
