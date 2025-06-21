import Link from "next/link";
import Image from "next/image";

interface LogoLinkProps {
  onClick?: () => void;
}

export default function LogoLink({ onClick }: LogoLinkProps) {
  return (
    <Link href="/" onClick={onClick}>
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
