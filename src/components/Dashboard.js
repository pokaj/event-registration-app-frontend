import { React, Component } from 'react';
import Header from './Header';
import Body from './Body';

class Dashboard extends Component{
    render(){
        return (
            <>
               <Header></Header>
               <Body></Body>
            </>
        )
    }
}

export default Dashboard;