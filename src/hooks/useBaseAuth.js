// hooks/useAuthBase.js
import useSWR from "swr";
import clienteAxios from "../config/axios";

const useAuthBase = () => {
  const token = localStorage.getItem("AUTH_TOKEN");

  // El token se lee en cada request (no al montar): este hook vive en el
  // Provider y comparte la clave '/api/user' con useAuth. Si usaba el token
  // del primer render, tras el login revalidaba con "Bearer null" → 401 →
  // el interceptor borraba el token recién guardado y no se redirigía.
  const { data: user, error, mutate } = useSWR('/api/user', () => {
    const currentToken = localStorage.getItem("AUTH_TOKEN");
    if (!currentToken) return Promise.reject(new Error('No token'));
    return clienteAxios('/api/user', {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    })
    .then(res => res.data)
    .catch(error => {
      throw new Error(error?.response?.data?.errors || 'Error desconocido');
    });
  });

  const login = async (datos, setErrores, setLoading) => {
    try {
      setLoading(true);
      const { data } = await clienteAxios.post('/api/login', datos);
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrores(null);
      await mutate();
    } catch (error) {
      setErrores(error.response?.data?.errors || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  const register = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post('/api/register', datos);
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrores(null);
      await mutate();
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };

  const logout = async () => {
    try {
      await clienteAxios.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('AUTH_TOKEN');
      await mutate(undefined);
    } catch {
      throw new Error('Error al cerrar sesión');
    }
  };

  return {
    login,
    register,
    logout,
    user,
    error,
    mutate,
  };
};

export default useAuthBase;
