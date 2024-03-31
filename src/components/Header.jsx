
import { Button, ButtonToolbar, IconButton } from "rsuite";
import MenuIcon from '@rsuite/icons/Menu';
import { useEffect, useState } from "react";

const Header = () => {
  const [hideText, setHideText] = useState(false);

  const logoAnimProperties = {
    width: hideText ? "0%" : "100%",
    opacity: hideText ? 0 : 1,
    transition: "width 1s, opacity .5s"
  }

  useEffect(() => {
    const timerId = setTimeout(() => setHideText(true), 1500);

    return () => clearTimeout(timerId);
  }, [])

  return (
    <div className="header p-4 flex justify-between">
      <h3 className="font-bold text-2xl self-center flex content-center app-header uppercase animate-letterSpread">
        <div className="animate-miniZoom">D</div>
        <div style={logoAnimProperties}>opamine&nbsp;</div>
        <div className="animate-miniZoom">D</div>
        <div style={logoAnimProperties}>aily</div>
      </h3>
      <IconButton className="px-2 flex justify-center items-center menu-icon rs-theme-dark" icon={<MenuIcon />} appearance="default" />

    </div>
  )
}

export default Header