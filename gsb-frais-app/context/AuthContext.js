import { createContext, useState, useContext } from 'react';

// 1. Création du contexte
const AuthContext = createContext();

// 2. Création du fournisseur de contexte
export const AuthProvider = ({ children }) => {
  // état local pour stocker l'utilisateur (null = non connecté)
    const [user, setUser] = useState(null);

    // 3. Fonction de connexion 
    const loginUser = (login, password) => {
        login = login.toLowerCase();
        // Vérification des identifiants
        if (login === 'Andre' && password === 'secret') {
            setUser({ login });
            return true; // Connexion réussie
        }
        return false; // Connexion échouée
    };

    // 4. Fonction de déconnexion
    const logoutUser = () => {
        setUser(null);
    };
    // 5. Valeur exposées aux composants enfants et rendu des composants enfants
    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// 6. Hook personnalisé pour utiliser le contexte facilement
export const useAuth = () => {
    return useContext(AuthContext);
}