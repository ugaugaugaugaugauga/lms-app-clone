'use client'

import { Button } from '@/components/ui/button'
import { useLoginModal } from '@/hooks/use-login-modal'
import { User } from '@prisma/client'
import {
  BookOpenText,
  CircleUserRound,
  Info,
  LayoutDashboard,
  LogOut,
  MonitorPlay,
  User2,
  UserPlus,
} from 'lucide-react'
import { useCallback, useState } from 'react'
import MenuItem from './menu-item'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

const menuItems = [
  { title: '대시보드', path: '/user/dashboard', icon: LayoutDashboard },
  { title: '내 강의', path: '/user/courses', icon: MonitorPlay },
  { title: '내 학습', path: '/user/learning', icon: BookOpenText },
  { title: '계정 정보', path: '/user/userinfo', icon: Info },
]

const UserMenu = ({ currentUser }: { currentUser: User | null }) => {
  const loginModal = useLoginModal()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const onClick = useCallback(() => {
    if (!currentUser) loginModal.onOpen()
    else setMenuOpen((v) => !v)
  }, [currentUser, loginModal])

  const handleMenuItemClick = (path: string) => {
    router.push(path)
    setMenuOpen(false)
  }

  return (
    <div className='flex items-center gap-3'>
      <Button variant={'ghost'} className='hidden md:block border'>
        대시보드
      </Button>
      <Avatar onClick={onClick} role='button'>
        <AvatarImage src={currentUser?.image!} />
        <AvatarFallback>
          <User2 />
        </AvatarFallback>
      </Avatar>
      {menuOpen && (
        <div className='absolute right-0 top-[60px] w-full md:w-[250px] z-[9999] bg-zinc-50 rounded-md border flex flex-col'>
          <div className='flex items-center p-3'>
            <Avatar>
              <AvatarImage src={currentUser?.image!} />
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
            </Avatar>
            <span className='ml-2'>{currentUser?.name} 님</span>
          </div>
          <div className='flex justify-between'>
            <div className='flex-1 bg-slate-200 flex justify-between p-2 mx-3 rounded-md'>
              수강중
              <span className='ml-1'>
                <span
                  role='button'
                  className='text-lime-600 underline hover:text-rose-500'
                >
                  0
                </span>
                개
              </span>
            </div>
            <div className='flex-1 bg-slate-200 flex justify-between p-2 mx-3 rounded-md'>
              완료
              <span className='ml-1'>
                <span
                  role='button'
                  className='text-lime-600 underline hover:text-rose-500 '
                >
                  0
                </span>
                개
              </span>
            </div>
          </div>
          <hr className='w-full mt-4' />

          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick(menuItem.path)}
              title={menuItem.title}
              icon={menuItem.icon}
            />
          ))}
          <hr className='w-full' />
          <MenuItem onClick={signOut} title='로그아웃' icon={LogOut} />
        </div>
      )}
    </div>
  )
}

export default UserMenu
