import Registro from "../components/FormularioRegistro";

export function Register() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-md mx-auto">
        <div className="border-2 border-gray-200 p-8">
          <h1 className="text-3xl mb-6 text-center">Crear Cuenta</h1>
          <Registro />
        </div>
      </div>
    </div>
  );
}
