import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Navbar = () => {
  return (
    <nav className='py-3 px-5 md:px-11 border-b h-16 flex items-center justify-between gap-3 font-semibold text-lg'>
      <Link to={`/`} className='font-bold text-2xl'>
        SafeCipher
      </Link>
      <Link
        to={`/`}
        className='ml-auto border-b-2 border-[transparent] hover:border-black duration-200'
      >
        Encrypt
      </Link>
      <Link
        to={`/decrypt `}
        className='border-b-2 border-[transparent] hover:border-black duration-200'
      >
        Decrypt
      </Link>
      <Link
        to='https://github.com/Abdullahiqbal2021/SafeCipher.git'
        target='_blank'
      >
        <Github />
      </Link>
    </nav>
  );
};

export default Navbar;
