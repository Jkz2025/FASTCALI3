import React, { useEffect, useState } from 'react';
import { supabase } from '../../CreateClient';
import Button from '../Dashboard/Components/Button';
import { useNavigate } from 'react-router-dom';

const LoginDashboard = () => {
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    async function signInWithGithub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
        });
        if (error) {
            console.error('Error signing in with GitHub:', error);
        } else {
            console.log('Sign-in data:', data);
        }
    }

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            console.error('Error signing in with Google:', error);
        } else {
            console.log('Sign-in data:', data);
        }
    }

     async function signOuthUser() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error closing session:', error);
        } else {
            console.log('Session closed successfully');
            setSession(null);  // Clear session state
            navigate('/');  // Redirect after logging out
        }
    }

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error);
            } else {
                setSession(data.session);
                console.log('Session:', data.session);
            }
        };

        fetchSession();
    }, []);

    return (
        <div>
            {!session && (
                <div className="flex flex-col items-center justify-center min-h-screen py-4">
                    <div className="py-4">
                        <Button onClick={signInWithGithub} text={`Iniciar Sesión con GitHub`} />
                    </div>
                    <div className="py-4">
                        <Button onClick={signInWithGoogle} text={`Iniciar Sesión con Google`} />
                    </div>
                </div>
            )}
            {session && (
                <div className="flex flex-col items-center justify-center min-h-screen py-4">
                    <Button onClick={signOuthUser} text={`Cerrar Sesión`} />
                    <p className="text-white">User: {session.user.email}</p>
                    {/* <p>ID de sesión: {session.access_token}</p> */}
                </div>
            )}
        </div>
    );
}

export default LoginDashboard;
