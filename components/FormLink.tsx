import Link from "next/link";

export default function FormLink({ to, text }: { to: string; text: string }) {
  return (
    <Link href={to}>
      <span className="text-blue-600 hover:underline">{text}</span>
    </Link>
  );
}
