import React from 'react';
import "../App.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { RequestAPI } from "../service/request.js";

let list = [];
const head = {headers:{'auth-token':'mbPY%UhK&u6NebnKppfr7NN54sgsc7','user-id':2}};
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
      }
     
  async modify(){
    const  [keep, remove] = [
        (document.querySelector(`input[name="keep"]:checked`)) ? document.querySelector(`input[name="keep"]:checked`).value: false,
        (document.querySelector(`input[name="delete"]:checked`)) ? document.querySelector(`input[name="delete"]:checked`).value: false
    ];

    if(!keep || !remove || keep == remove)
        return alert('Invalid');
    
    await new RequestAPI({...head,url:`merge/${keep}/${remove}`}).get();
    alert('Request sent')
  }

  async Search(){
    const req = await new RequestAPI({...head,url:'duplicated'}).post();
    list = req.data;
    this.setState((state,props) => ({list: req.data}));
  }

  renderTableContent(){
      return this.state.list.map((key) => {
        return(
            <tr>
                <td>
                    <input type="radio" name="keep" value={key.clientID}/>
                </td>
                <td>
                    <input type="radio" name="delete" value={key.clientID}/>
                </td>
                <td>{key.clientID}</td>
                <td>{key.clientNome}</td>
                <td>{key['NIF']}</td>
            </tr>
        )
      })
  }

render(){
    return (
       <div>
            <p className="text-3xl font-semibold py-4">Duplicated Clients</p>
            <div className="flex  py-2">
                <form id="form" className="space-x-4">
                    <TextField 
                        size="small"
                        name="string1" label="string1" variant="filled" />
                    <TextField 
                        size="small"
                        name="string2" label="string2" variant="filled" />
                 <Button variant="contained" color="primary" onClick={() => this.Search()}>
                    Search
                    </Button>           
                </form>
            </div>
            <div className="py-8">
                <Button variant="contained" color="primary" onClick={this.modify}>
                Process
                </Button>    
            </div>
            <div>
{/*             <Input
                id="input-with-icon-adornment"
                endAdornment={
                    <InputAdornment position="end" label="Search">
                        <SearchIcon />
                    </InputAdornment>
                }
                /> */}
               
                <table>
                    <thead>
                    <tr>
                        <th>Keep</th>
                        <th>Delete</th>
                        <th>ID</th>
                        <th>Name</th> 
                        <th>NIF</th>
                    </tr>                        
                    </thead>

                    <tbody id="tblBody_DBA">
                        {
                            this.renderTableContent()
                        }                        
                    </tbody>

                    </table>
            
            </div>
      
</div>
      
    );
}
  



}

export default App;