import { createContext, useState, useContext } from 'react';
import { signIn } from '../services/authService';
// 1. Création du contexte
const AuthContext = createContext();
// 2. Création du fournisseur de contexte
export const AuthProvider = ({ children }) => {
  // état local pour stocker l'utilisateur (null = non connecté)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // 3. Fonction de connexion
    // La fonction loginUser appelle désormais réellement l’API via le service. Remplacer votre fonction loginUser par le code ci-dessous en le complétant avec les 4 étapes suivantes (4 lignes de code) :
    // Créer une variable data qui stocke la valeur renvoyée par la fonction signIn 
    // qui prend en argument le login et le mot de passe 
    // (attention, signIn est asynchrone puisqu’elle fait un appel API, l’appel à cette fonction doit être précédé de await – c’est la raison pour laquelle
    // la fonction loginUser doit être déclarée avec async).
    // Affecter la valeur data.visiteur à l’état user
    // Affecter la valeur data.acces_token à l’état token
    // Renvoyer data
    const loginUser = async (login, pwd) => {
        const data = await signIn(login, pwd);
        setUser(data.visiteur);
        setToken(data.acces_token);
        return data;
    }

    // 4. Fonction de déconnexion
    const logoutUser = () => {
        setUser(null);
        setToken(null);
    };
    // 5. Valeur exposées aux composants enfants et rendu des composants enfants
    return (
        <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// 6. Hook personnalisé pour utiliser le contexte facilement
export const useAuth = () => {
    return useContext(AuthContext);
}