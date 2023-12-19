import { LucideIcon } from 'lucide-react'

interface MenuItemProps {
  icon: LucideIcon
  title: string
  onClick: () => void
}

const MenuItem = ({ icon: Icon, title, onClick }: MenuItemProps) => {
  return (
    <button onClick={onClick} className='w-full flex hover:bg-slate-200 p-5'>
      <Icon />
      <span className='ml-3'>{title}</span>
    </button>
  )
}

export default MenuItem
