export default function ProfileView() {
  return (
    <form className="bg-white p-10 rounded-lg space-y-5" onSubmit={() => {}}>
      <legend className="text-2xl text-slate-800 text-center">
        Editar información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="nombreUsuario">Usuario</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Nombre de usuario"
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu descripción"
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="imagen">Imagen</label>
        <input
          id="imagen"
          type="file"
          name="imagen"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={() => {}}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar cambios"
      />
    </form>
  );
}
