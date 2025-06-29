import Link from "next/link";
import Image from "next/image";

export default function LogoLink() {
  return (
    <Link href="/">
      <Image
        src="/logo.jpg"
        alt="Logo"
        width={100}
        height={100}
        className="rounded-md"
      />
    </Link>
  );
}
