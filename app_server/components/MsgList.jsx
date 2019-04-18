const React = require('react');
const MsgSingle = require('./MsgSingle.jsx');
/*
const MsgList2 = (props) => {
    return(
        <table className="table table-striped table-bordered">
            <tr> 
                <th scope="col" className="w-25">#</th> 
                <th scope="col" className="w-25">Name</th> 
                <th scope="col" className="w-50">Message</th> 
            </tr>
            <tbody>
                {props.messages.map( (message,index)=>
                     <MsgSingle id={message._id} message={message} index = {index+1} userName={props.userName}/>
                    )}
            </tbody>
        </table>

    );
} */

class MsgList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            messages:this.props.messages,
            userName:this.props.userName
        }
    }
    deleteMsgCallback(message){
        console.log(message.id);
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
                   <th scope="col" className="w-5"></th> 
               </tr>
            
               {this.props.messages.map( (message,index)=>
           
                      <MsgSingle id={message._id} 
                      message={message} 
                      index = {index+1} 
                      userName={this.props.userName} 
                      deleteMsgCallback={this.deleteMsgCallback}/>
                   
               )}
                
               </tbody>
           </table>
        )
    }
} 
module.exports = MsgList