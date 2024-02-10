import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../hooks/useTypedSelector";
import { useJwt } from "react-jwt";
import { baseUrl } from "../config/Config";
import { logoutUser } from "../features/userSlice";
import axios from "axios";

interface AuthContextProps {
    isAuthenticated: boolean
    isAdminRoleExists: boolean | null
    isSuperAdminRoleExists: boolean | null
    isOwnerExists: boolean | null
    token: string
    userId: string
    loading: boolean
    message: string
    status: string
    roles: RoleData[]
}

interface DecodedToken {
    nameid: string;
    role: string[];
    iat: number;
    exp: number;
}

interface Data {
    _id: object,
    roleName: string,
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface RoleData {
  id: string
  name: string
}
interface Role {
    message: string,
    data: RoleData[]
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [userId, setUserId] = useState<string>("");
    const [roleNames, setRoleNames] = useState<string[]>([]);
    const [roles, setRoles] = useState<RoleData[]>([]);
    //const [tokenExpired, setTokenExpired] = useState(Boolean);
    const [isAdminRoleExists, setIsAdminRoleExists] = useState<boolean | null>(null);
    const [isSuperAdminRoleExists, setIsSuperAdminRoleExists] = useState<boolean | null>(null);
    const [isOwnerExists, setIsOwnerExists] = useState<boolean | null>(null);

    const { isAuthenticated, token, loading, message, status } = useAppSelector((state) => state.user);
    //const dispatch = useAppDispatch();
    const { decodedToken, isExpired } = useJwt(token);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(isExpired) {
            dispatch(logoutUser());
        };
    }, [dispatch, isExpired])

    useEffect(() => {
        if (decodedToken) {
          const { role, nameid } = decodedToken as DecodedToken;
          setUserId(nameid);
          setRoleNames(role); // current user roles
          //setTokenExpired(isExpired);
      
          const rolesApiEndpoint = `${baseUrl}/api/role/get-all-roles`;
          const fetchData = async () => {
            try {
              const response = await axios.get<Role>(rolesApiEndpoint, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const allRoles = response.data.data;
              setRoles(allRoles);
              const isAdmin = allRoles.some(
                (role) =>
                  roleNames.includes(role.name) &&
                  (role.name === "Admin")
              );
      
              const isSuperAdmin = allRoles.some(
                (role) =>
                  roleNames.includes(role.name) &&
                  (role.name === "SuperAdmin" || role.name === "Owner")
              );
      
              const isOwner = allRoles.some(
                (role) =>
                  roleNames.includes(role.name) &&
                  role.name === "Owner"
              );
      
              setIsAdminRoleExists(isAdmin);
              setIsSuperAdminRoleExists(isSuperAdmin);
              setIsOwnerExists(isOwner);
            } catch (error) {
              console.error('Error fetching roles:', error);
            }
          };
      
          fetchData();
        }
      }, [dispatch, decodedToken, roleNames, userId, isExpired, token]);
      
    
    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                token,
                loading,
                status,
                message,
                isAdminRoleExists,
                isSuperAdminRoleExists,
                isOwnerExists,
                userId,
                roles
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}