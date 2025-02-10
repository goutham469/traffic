import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../common/Header';

function AllUsers() {
    const [users, setUsers] = useState([]);

    async function getAllUsers() {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/users`);
        data = await data.json();
        setUsers(data);
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className='flex-1 overflow-auto relative z-10'>
			<Header title='All users' />
			<main>
                <h2 className="text-center text-2xl font-semibold mb-4">All Users ({users.length})</h2>
                <div className="overflow-auto max-h-[80vh] border border-gray-700 rounded-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="p-3 border border-gray-700">Profile</th>
                                <th className="p-3 border border-gray-700">Email</th>
                                <th className="p-3 border border-gray-700">Plan</th>
                                <th className="p-3 border border-gray-700">payment date</th>
                                <th className="p-3 border border-gray-700">Credits</th>
                                <th className="p-3 border border-gray-700">Action</th>
                                <th className="p-3 border border-gray-700">Block/Un-Block</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => (
                                <UserRow key={idx} user={user} />
                            ))}
                        </tbody>
                    </table>
                </div>
			</main>
		</div>

        // <div className=" mx-auto my-6 p-4 bg-gray-950 text-white rounded-lg shadow-lg">

            
        // </div>
    );
}

function UserRow({ user }) {
    async function ChangePlanToPremium() {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/update-to-premium-account`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email })
        });
        data = await data.json();
        toast.success(data.message);
    }

    async function ChangePlanToBasic() {
        let response = prompt("enter the user email id : ")
        if(response == user.email)
        {
            let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/update-to-basic-account`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email })
            });
            data = await data.json();
            toast.success(data.message);
        }
        else{
            toast.warning("user downgration failed.")
        }
        
    }

    async function blockUser()
    {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/block-user`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email })
        });
        data = await data.json();
        console.log(data);

        toast.success(data.message);
    }
    async function unBlockUser()
    {
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/un-block-user`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email })
        });
        data = await data.json();
        console.log(data);

        toast.success(data.message);
    }

    return (
        <tr className="text-center bg-gray-900 hover:bg-gray-800 transition">
            <td className="p-3 border border-gray-700">
                {
                    user.img 
                    ? <img src={user.img} alt="Profile" className="w-12 h-12 rounded-full mx-auto" />
                    :
                    <p>img</p>
                }
            </td>
            <td className="p-3 border border-gray-700">{user.email}</td>
            <td className="p-3 border border-gray-700 capitalize">{user.plan}</td>
            <td className="p-3 border border-gray-700 capitalize">{ user.purchasedOn ? user.purchasedOn : ' not applicable '}</td>
            <td className="p-3 border border-gray-700">{user.credits}</td>
            <td className="p-3 border border-gray-700">
                {user.plan === 'basic' ? (
                    <button onClick={ChangePlanToPremium} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md">
                        Upgrade
                    </button>
                ) : (
                    <button onClick={ChangePlanToBasic} className="bg-yellow-500 hover:bg-yellow-600 text-black py-1 px-3 rounded-md">
                        Downgrade
                    </button>
                )}
            </td>

            <td className="p-3 border border-gray-700">
                {  user.isBlocked ? (
                    <button 
                        onClick={unBlockUser} 
                        className="bg-green-500 hover:bg-green-600 text-black py-1 px-3 rounded-md"
                    >
                      Un-block
                  </button>
                ) : (
                    <button
                     onClick={blockUser}
                     className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                    >
                        Block
                    </button>
                )}
            </td>


        </tr>
    );
}

export default AllUsers;
