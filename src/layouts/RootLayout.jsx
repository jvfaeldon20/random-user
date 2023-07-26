import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='root'>
        <Outlet/>
    </div>
  )
}

export default RootLayout