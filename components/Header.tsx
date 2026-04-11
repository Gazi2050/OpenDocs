import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href='/' className="md:flex-1 flex items-center gap-2">
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={40}
          height={40}
        />
        <span className="text-2xl font-base tracking-tight hidden md:block text-white">OpenDocs</span>
      </Link>
      {children}
    </div>
  )
}

export default Header