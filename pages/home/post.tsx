import Image from "next/image";

export default function Post({
  number,
  name,
  title,
}: {
  number: number;
  name: string;
  title: string;
}) {
  return (
    <div className="bg-slate-100 w-full p-2 rounded-lg shadow-lg max-w-80 flex flex-col justify-start items-center">
      <Image
        src={`/image${number}.png`}
        alt={`Feature ${number}`}
        width={256}
        height={256}
        className="rounded-lg shadow-lg bg-white"
        priority
      />
      <div className="mt-4 text-slate-900">
        <h1 className="uppercase w-full font-semibold text-center">{name}</h1>
        {/* <h2 className="mt-4 text-lg font-semibold text-slate-600">{title}</h2> */}
        <p className="mt-2 text-slate-500">{title}</p>
      </div>
    </div>
  );
}
