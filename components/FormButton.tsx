export default function FormButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
    >
      {text}
    </button>
  );
}
