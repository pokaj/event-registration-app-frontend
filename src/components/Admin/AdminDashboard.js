import { React, Component } from 'react';
import AdminHeader from './AdminHeader';
import AdminBody from './AdminBody';

class AdminDashboard extends Component {
    render(){
        return (
            <>
               <AdminHeader></AdminHeader>
               <AdminBody></AdminBody>
            </>
        )
    }
}

export default AdminDashboard;