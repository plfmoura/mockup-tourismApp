import { createContext, useState } from "react";

export const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState(false);
  const [paymentFooter, setPaymentFooter] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false)
  const [newNotification, setNewNotification] = useState(false)

  const handleScrollableCheck = ( check ) => {
    check ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto'
  }

  handleScrollableCheck(showOffCanvas)

  let alignPaymentShotcuts = paymentFooter ? 'center' : 'space-between'
  let changeBgColor = bgColor
    ? { backgroundColor: "#fff", fontWeight: "500" }
    : {
        backgroundColor: "#ffffff99",
        fontWeight: "500",
        backdropFilter: "blur(5px)",
      };
  let changeColor = bgColor ? "#333" : "#333";
  let changeLogoColor = bgColor ? "#2ea9ff" : "#000";
  let changeNotficationIcon = bgColor ? "#333" : "#fff";
  let userNavBarBorder = bgColor ? 'rgba(0, 0, 0, 0.10) 0px 1px 1px .1rem' : 'none'

  return (
    <NavBarContext.Provider
      value={{
        setBgColor,
        changeColor,
        changeBgColor,
        changeNotficationIcon,
        paymentFooter,
        setPaymentFooter,
        alignPaymentShotcuts,
        showOffCanvas,
        setShowOffCanvas,
        handleScrollableCheck,
        newNotification,
        setNewNotification,
        changeLogoColor,
        userNavBarBorder
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};
