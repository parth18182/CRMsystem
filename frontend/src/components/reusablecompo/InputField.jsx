function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold tracking-widest text-white/60">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full rounded-xl border border-white/10
          bg-white/5 px-4 py-3 text-white
          outline-none transition-all
          focus:border-violet-500
        "
      />
    </div>
  );
}

export default InputField;