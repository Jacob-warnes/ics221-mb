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
    if (this.props.userName == "Admin") {
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
