import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center items-center mt-40">
      <Image
        className="wordmark-image"
        src="/logo-leemulvey.svg"
        width={228 * 3}
        height={89 * 3}
        alt="Lee Mulvey"
      />
    </div>
  );
}
