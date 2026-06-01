import { useState } from "react";
import { useNavigate } from "react-router";

export function Register() {
  const navigate = useNavigate();
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!formData.acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    console.log("Registro:", formData);
    alert("¡Cuenta creada exitosamente!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-md mx-auto">
        <div className="border-2 border-gray-200 p-8">
          <h1 className="text-3xl mb-6 text-center">Crear Cuenta</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff]"
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
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff]"
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
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff]"
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
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff]"
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
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff]"
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
                className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff]"
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
                className="mt-1 w-5 h-5 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007bff]"
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
              className="w-full bg-[#007bff] text-white py-3 hover:bg-[#0056b3] transition-colors"
            >
              Crear Cuenta
            </button>

            <p className="text-center text-gray-600 text-sm">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-[#007bff] hover:underline"
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
