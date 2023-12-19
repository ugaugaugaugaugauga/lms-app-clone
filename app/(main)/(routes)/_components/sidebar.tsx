'use client'
import { BookOpenText, Info, Layout, MonitorPlay } from 'lucide-react'
import SidebarItem from './sidebar-item'

const routes = [
  {
    icon: Layout,
    label: '대시보드',
    href: '/user/dashboard',
  },
  {
    icon: MonitorPlay,
    label: '내 강의',
    href: '/user/courses',
  },
  {
    icon: BookOpenText,
    label: '내 학습',
    href: '/user/learning',
  },
]

const settingRoutes = {
  icon: Info,
  label: '계정 정보',
  href: '/user/userinfo',
}

const Sidebar = () => {
  return (
    <div className='md:w-[250px] md:relative md:flex-col fixed bottom-0 z-30 flex w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      <div className='hidden md:block text-zinc-400 text-sm ml-2'>설정</div>
      <SidebarItem
        key={settingRoutes.href}
        icon={settingRoutes.icon}
        label={settingRoutes.label}
        href={settingRoutes.href}
      />
    </div>
  )
}

export default Sidebar
