const React = require('react');
/*const MsgSingle2 = (props) =>{
   // console.log("msgName:"+props.message.name +"   userName"+props.userName);
    if(props.message.name == props.userName){
        return(
        <tr key={props.index}>
            <td>{props.index}</td>
            <td>{props.message.name}</td>
            <td>{props.message.msg}</td>
            <td><button className = "btn-danger" type="button">Delete</button></td>
            <td><button className="btn-info" type="button">Edit</button></td>
         </tr>);
    }else{
        return(
         <tr key={props.index}>
            <td>{props.index}</td>
            <td>{props.message.name}</td>
            <td colSpan="3">{props.message.msg}</td>
         </tr>
        );
    }
} */
class MsgSingle extends React.Component{
    constructor(props){
        super(props);
        this.deleteMsg = this.deleteMsg.bind(this);
        
    }
    deleteMsg(event){
        var id = event.target.value;
        this.props.deleteMsgCallback({id:id});

    }
    render(){
    
        if(this.props.message.name == this.props.userName){
            
            return(
            <tr key={this.props.index}>
                <td>{this.props.index}</td>
                <td>{this.props.message.name}</td>
                <td>{this.props.message.msg}</td>
                <td><button className = "btn-danger" type="button" value={this.props.id} onClick={this.deleteMsg} >Delete</button></td>
                <td><button className="btn-info" type="button" value={this.props.id}>Edit</button></td>
             </tr>);
        }else{
            return(
             <tr key={this.props.index}>
                <td>{this.props.index}</td>
                <td>{this.props.message.name}</td>
                <td colSpan="3">{this.props.message.msg}</td>
             </tr>
            );
        }
    }
}
module.exports = MsgSingle
