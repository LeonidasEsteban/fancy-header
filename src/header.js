import React, { useRef, useState, useEffect } from 'react'
import './header.css'



function Header({ menuList }) {
  const menuRef = useRef(null)
  const headerRef = useRef(null)
  const [menu, setMenu] = useState(menuList)
  const [buffer, setBuffer] = useState([])
  const [activeContextualMenu, setActiveContextualMenu] = useState(false)

  function handleResize() {
    setMenu(menuList)
    configMenu()
  }

  function configMenu() {
    let width = 0
    const list = [...menuRef.current.children]
    for (let index = 0; index < list.length; index++) {
      width = width + list[index].offsetWidth
      if (menuRef.current.offsetWidth - width <= 0) {
        setMenu(menuList.slice(0, index))
        setBuffer(menuList.slice(index, list.length))
        break
      }
    }
  }

  function handleToggleMenu() {
    setActiveContextualMenu(!activeContextualMenu)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    configMenu()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <>
    <header className="header" ref={headerRef}>
      <div className="wrapper">
        <div className="content">
          <img className="logo" src="https://ongrin.com/static/images/general/grin-logo-white@2x.png" alt="" width={60} />
          <div className="menu" ref={menuRef}>
            {
              menu.map((item, index) => (
                <p className="item" key={index}>{item.label}</p>
              ))
            }
          </div>
            {
              buffer.length && (
                <span className="context-menu-button" onClick={handleToggleMenu}>menu</span>
              )
            }
        </div>
        <div className="context-menu">
          {
            activeContextualMenu && buffer.map((item, index) => (
              <p className="context-item" key={index}>{item.label}</p>
            ))
          }
        </div>
      </div>
    </header>
    </>
  )
}


export default Header