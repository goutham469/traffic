import React, { useEffect, useState } from 'react'
import './AllUsers.css'
import Notification1 from '../../Notification'

function AllUsers() {
    const [users , setUsers] = useState([])

    async function getAllUsers()
    {
        let data =  await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/users`) 
        data = await data.json()
        setUsers(data)
    }
    useEffect(()=>{
        getAllUsers()
    },[])
  return (
    <div>
        <h4>All Users</h4>
        <div style={{textAlign:"center",height:"70vh",overflowY:"scroll"}}>
            <center>
                {
                    users.map((user,idx)=><User key={idx} user={user}/>)
                }
            </center>
        </div>
    </div>
  )
}

function User({user})
{
    const [notification, setNotification] = useState(null);

    async function ChangePlanToPremium()
    {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/update-to-premium-account`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify( {email : user.email} )
        })
        data = await data.json()

        // alert(data.message)
        setNotification({ message: data.message , color: 'green' });
    }
    async function ChangePlanToBasic()
    {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/update-to-basic-account`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify( {email : user.email} )
        })
        data = await data.json()

        // alert(data.message)
        setNotification({ message: data.message , color: 'green' });
    }
    return <div className='admin-single-user'>
                <b>{user.email}</b><br/>
                <img src={user.img}/>
                <p>plan : {user.plan}</p>
                {
                    user.plan == 'basic' ?
                    <button onClick={()=>ChangePlanToPremium()}>Upgrade to Premium</button>
                    :
                    <button onClick={()=>ChangePlanToBasic()}>Down grade to Basic</button>
                }
                <p>credits remaining : {user.credits}</p>

                {notification && (
                    <Notification1 
                        message={notification.message} 
                        color={notification.color}
                        onClose={() => setNotification(null)} 
                    />
                )}

            </div>
}

export default AllUsers