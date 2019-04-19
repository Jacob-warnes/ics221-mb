const React = require('react');
const MsgSingle = require('./MsgSingle.jsx');
const DeleteAll = require('./DeleteAll.jsx');


class MsgList extends React.Component{
    constructor(props){
        super(props);
        this.editMsgCallBack = this.editMsgCallBack.bind(this);
        this.state={
            chosen:""
        }
    }
   editMsgCallBack(id){
    this.setState({
        chosen:id
    });
   }
    render(){
        return(
            <table className="table table-striped table-bordered">
            <tbody>
               <tr> 
                   <th scope="col" className="w-5">#</th> 
                   <th scope="col" className="w-10">Name</th> 
                   <th scope="col" className="w-75">Message</th>
                   <th scope="col" className="w-5"></th>
                   <DeleteAll userName={this.props.userName} deleteAllMsgCallback={this.props.deleteAllMsgCallback}/>
               </tr>
            
               {this.props.messages.map( (message,index)=>
           
                      <MsgSingle id={message._id} 
                      message={message} 
                      index = {index+1} 
                      userName={this.props.userName} 
                      deleteMsgCallback={this.props.deleteMsgCallback}
                      editMsgCallBack={this.editMsgCallBack}
                      saveMsgCallback={this.props.saveMsgCallback}
                      chosen={this.state.chosen}
                      />
                   
               )}
                
               </tbody>
           </table>
        )
    }
} 
module.exports = MsgList