import Sidebar from './_components/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex'>
      <Sidebar />
      <div className='transition-all flex-1'>{children}</div>
    </div>
  )
}
