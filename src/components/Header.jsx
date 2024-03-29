
import {  Button, ButtonToolbar, IconButton } from "rsuite";
import MenuIcon from '@rsuite/icons/Menu';

const Header = () => {
  return (
    <div className="header p-4 flex justify-between">
        <h3 className="font-bold text-2xl self-center app-header">Dopamine Daily</h3>
        <IconButton className="px-2 flex justify-center items-center menu-icon rs-theme-dark" icon={<MenuIcon />} appearance="default" />
        
    </div>
  )
}

export default Header