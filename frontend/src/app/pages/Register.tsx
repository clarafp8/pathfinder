import { useState } from "react";
import { useNavigate } from "react-router";
import { usuariosAPI } from "../services/apiClient";

export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!formData.acceptTerms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      // Verificar si el email ya existe
      const usuarioExistente = await usuariosAPI.getByEmail(formData.email);
      if (usuarioExistente) {
        setError("Este correo electrónico ya está registrado");
        setLoading(false);
        return;
      }

      // Crear el usuario
      const nuevoUsuario = {
        nombre: formData.firstName,
        apellidos: formData.lastName,
        email: formData.email,
        password: formData.password,
        fechaNac: formData.birthDate,
      };

      const usuario = await usuariosAPI.create(nuevoUsuario);
      console.log("Usuario creado:", usuario);
      
      alert("¡Cuenta creada exitosamente!");
      navigate("/");
    } catch (err) {
      console.error("Error al registrar:", err);
      setError("Error al crear la cuenta. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-md mx-auto">
        <div className="border-2 border-gray-200 p-8">
          <h1 className="text-3xl mb-6 text-center">Crear Cuenta</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff] disabled:bg-gray-100"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Apellidos</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff] disabled:bg-gray-100"
                placeholder="Tus apellidos"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff] disabled:bg-gray-100"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fecha de Nacimiento</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff] disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff] disabled:bg-gray-100"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff] disabled:bg-gray-100"
                placeholder="Repite tu contraseña"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                disabled={loading}
                className="mt-1 w-5 h-5 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007bff] disabled:bg-gray-100"
              />
              <label className="text-sm text-gray-700">
                Acepto los{" "}
                <a href="#" className="text-[#007bff] hover:underline">
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="text-[#007bff] hover:underline">
                  política de privacidad
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#007bff] text-white py-3 hover:bg-[#0056b3] disabled:bg-gray-400 transition-colors"
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>

            <p className="text-center text-gray-600 text-sm">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={loading}
                className="text-[#007bff] hover:underline disabled:opacity-50"
              >
                Inicia sesión aquí
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
