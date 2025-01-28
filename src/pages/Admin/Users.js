import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
        <div className="max-w-6xl mx-auto my-6 p-4 bg-gray-950 text-white rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-semibold mb-4">All Users</h2>
            <div className="overflow-auto max-h-[70vh] border border-gray-700 rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="p-3 border border-gray-700">Profile</th>
                            <th className="p-3 border border-gray-700">Email</th>
                            <th className="p-3 border border-gray-700">Plan</th>
                            <th className="p-3 border border-gray-700">Credits</th>
                            <th className="p-3 border border-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <UserRow key={idx} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
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
        let data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/admin/update-to-basic-account`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email })
        });
        data = await data.json();
        toast.success(data.message);
    }

    return (
        <tr className="text-center bg-gray-900 hover:bg-gray-800 transition">
            <td className="p-3 border border-gray-700">
                <img src={user.img} alt="Profile" className="w-12 h-12 rounded-full mx-auto" />
            </td>
            <td className="p-3 border border-gray-700">{user.email}</td>
            <td className="p-3 border border-gray-700 capitalize">{user.plan}</td>
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
        </tr>
    );
}

export default AllUsers;
