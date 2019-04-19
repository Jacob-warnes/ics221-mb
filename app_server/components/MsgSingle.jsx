const React = require("react");

class MsgSingle extends React.Component {
  constructor(props) {
    super(props);
    this.deleteMsg = this.deleteMsg.bind(this);
    this.editMsg = this.editMsg.bind(this);
    this.saveMsg = this.saveMsg.bind(this);
    this.cancleMsg = this.cancleMsg.bind(this);
    this.handleText = this.handleText.bind(this);
  }
  deleteMsg(event) {
    var id = event.target.value;
    this.props.deleteMsgCallback({ _id: id });
  }
  editMsg(event) {
    this.props.editMsgCallBack(event.target.value);
  }
  saveMsg(event) {
    var newMsg = {
      _id: event.target.value,
      msg: this.props.message.msg
    };

    this.props.saveMsgCallback(newMsg);
    this.props.editMsgCallBack("");
  }
  cancleMsg(event) {
    this.props.editMsgCallBack("");
  }
  handleText(event) {
    this.setState({
      newMsg: event.target.value
    });

    this.props.message.msg = event.target.value;
  }
  render() {
    //if use owns a message
    if (this.props.message.name == this.props.userName) {
      //if user wants to edit the message
      if (this.props.message._id == this.props.chosen) {
        return (
          <tr key={this.props.index}>
            <td>{this.props.index}</td>
            <td>{this.props.message.name}</td>
            <td>
              <input
                id="mgs"
                value={this.props.message.msg}
                onChange={this.handleText}
              />
            </td>
            <td>
              <button
                className="btn-warning"
                type="button"
                value={this.props.id}
                onClick={this.cancleMsg}
              >
                Cancel
              </button>
            </td>
            <td>
              <button
                className="btn-success"
                type="button"
                value={this.props.id}
                onClick={this.saveMsg}
              >
                Save
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={this.props.index}>
            <td>{this.props.index}</td>
            <td>{this.props.message.name}</td>
            <td>{this.props.message.msg}</td>
            <td>
              <button
                className="btn-danger"
                type="button"
                value={this.props.id}
                onClick={this.deleteMsg}
              >
                Delete
              </button>
            </td>
            <td>
              <button
                className="btn-info"
                type="button"
                value={this.props.id}
                onClick={this.editMsg}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      }
    }
    //another users message
    else {
      return (
        <tr key={this.props.index}>
          <td>{this.props.index}</td>
          <td>{this.props.message.name}</td>
          <td colSpan="3">{this.props.message.msg}</td>
        </tr>
      );
    }
  }
}
module.exports = MsgSingle;
