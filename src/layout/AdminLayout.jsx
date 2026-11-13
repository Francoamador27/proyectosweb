import React, { useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import UseAuth from '../hooks/useAuth';
import { IS_ADMIN_APP } from '../config/site';

const AdminLayout = () => {
    const { user, error } = UseAuth({ middleware: 'auth' });
    const navigate = useNavigate();

    useEffect(() => {
        // Sin sesión (sin token o token inválido): al login
        if (!user && error) {
            navigate('/auth/login', { replace: true });
            return;
        }
        // Usuario logueado que no es admin: a su cuenta
        // (en admin.* "/" vuelve al dashboard y generaría un bucle)
        if (user && user.admin !== 1) {
            navigate(IS_ADMIN_APP ? '/mi-cuenta' : '/', { replace: true });
        }
    }, [user, error, navigate]);

    if (!user && !error) return <p>Cargando...</p>;

    if (!user || user.admin !== 1) return null; // ya redirige

    return (
        <div className="admin-layout">
            <AdminSidebar />
           
        </div>
    );
};

export default AdminLayout;
