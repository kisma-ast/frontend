import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const backendUrlNet = 'http://127.0.0.1:8000/api'; // URL de votre backend Laravel

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Effectuer la requête de connexion
            const response = await axios.post(
                `${backendUrlNet}/login`, 
                { email, password }, // Données envoyées au backend
                {
                    headers: {
                        // Aucun token n'est nécessaire pour la connexion, c'est le moment d'obtenir le token
                        'Content-Type': 'application/json',
                    }
                }
            );

            // Vérifier si la connexion est réussie
            if (response.status === 200) {
                // Stocker le token JWT dans le localStorage
                localStorage.setItem('token', response.data.token);
                setError('');
                alert('Connexion réussie');
                // Vous pouvez rediriger l'utilisateur ou mettre à jour l'état de l'application
            }
        } catch (error: any) {
            // Afficher un message d'erreur si la connexion échoue
            if (error.response && error.response.data) {
                setError(error.response.data.error || 'Une erreur est survenue');
            } else {
                setError('Nom d\'utilisateur ou mot de passe incorrect.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginPage;
