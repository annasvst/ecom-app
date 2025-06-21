export default function Footer() {
  return (
    <footer className="border-t-2 border-white/10 text-stone-50 text-center py-8 bg-sky-950">
      <p>Copyright &copy; {new Date().getFullYear()} MiniCom</p>
    </footer>
  );
}