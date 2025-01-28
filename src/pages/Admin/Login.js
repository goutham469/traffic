import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { storeLoginTimestamp } from '../../utils/auth';

function AdminLogin() {
    const navigate = useNavigate();
    const [logged, setLogged] = useState(localStorage.getItem('adminEmail'));

    function onSuccess(response) {
        let credential = response.credential;
        credential = jwtDecode(credential);
        if (credential.email === "uppinurigouthamreddy@gmail.com") {
            setLogged(true);
            localStorage.setItem('adminEmail', credential.email);
            toast.success("Login success");
            storeLoginTimestamp();
            navigate('/admin-dashboard');
        } else {
            toast.error("Invalid email");
        }
    }

    useEffect(() => {
        if (localStorage.getItem('adminEmail') === "uppinurigouthamreddy@gmail.com") {
            navigate('/admin-dashboard');
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
                <h1 className="text-3xl font-bold mb-4 text-white">Traffic Monitor</h1>
                <p className="text-gray-300 mb-6">Login to use the Service.</p>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
                    <div className="flex justify-center">
                        <GoogleLogin onSuccess={onSuccess} />
                    </div>
                </GoogleOAuthProvider>
                <p className="text-sm text-red-500 mt-4">* You must log in with the admin email only *</p>
            </div>
        </div>
    );
}

export default AdminLogin;
