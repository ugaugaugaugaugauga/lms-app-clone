import getCurrentUser from '@/actions/get-current-user'
import Logo from './logo'
import SearchBar from './search-bar'
import UserMenu from './usermenu'

const Navbar = async () => {
  const currentUser = await getCurrentUser()
  return (
    <div className='relative pb-[60px]'>
      <div className='fixed z-50 h-[60px] px-3 md:px-6 w-full flex md:justify-between items-center shadow-sm bg-white'>
        <Logo />
        <div className='flex-1 md:hidden' />
        <SearchBar />
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  )
}

export default Navbar
