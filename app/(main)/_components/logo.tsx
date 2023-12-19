import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={'/'} className=''>
      <Image
        src={'/logo.svg'}
        alt='logo'
        width={150}
        height={150}
        role='button'
      />
    </Link>
  )
}

export default Logo
