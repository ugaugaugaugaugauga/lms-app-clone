import Navbar from './_components/navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-full'>
      <Navbar />
      {children}
    </div>
  )
}
