const React = require("react");

class DeleteAll extends React.Component {
  constructor(props) {
    super(props);
    this.deletAll = this.deletAll.bind(this);
  }
  deletAll() {
    this.props.deleteAllMsgCallback();
  }
  render() {
    console.log("userName = " + this.props.userName);
    console.log("ADMIN = " + process.env.ADMIN);
    if (this.props.userName == process.env.ADMIN) {
      return (
        <th scope="col" className="w-5">
          <button className="btn-danger" type="button" onClick={this.deletAll}>
            DeleteAll
          </button>
        </th>
      );
    } else {
      return <th scope="col" className="w-5" />;
    }
  }
}
module.exports = DeleteAll;
