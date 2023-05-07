import React from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcAmex,
  FaCcJcb,
  FaCcDinersClub,
} from "react-icons/fa";
import visa from "../../../assets/payment/flag_visa.png";
import amex from "../../../assets/payment/flag_amex.png";
import elo from "../../../assets/payment/flag_elo.png";
import mastercard from "../../../assets/payment/flag_master.svg";
import dinnerClub from "../../../assets/payment/flag_dinner.png"
import discover from "../../../assets/payment/flag_discover.ico"
import styles from "../CardsFlags/cardsFlags.module.css";

export default function CardsFlags() {
  return (
    <div className={styles.cardFlagContainer}>
      <span
        style={{ display: "block", marginBottom: ".2rem", fontSize: "10px" }}
      >
        A plataforma Azul conta com seguro viagem gratuíto para as bandeiras.
      </span>
      <div className={styles.cardFlag}>
        <img
          className={styles.cardSizeVisa}
          src={visa}
        />
        <img
          className={styles.cardSizeAmex}
          src={amex}
        />
        <img
          className={styles.cardSizeElo}
          src={elo}
        />
        <img
          className={styles.cardSizeMc}
          src={mastercard}
        />
        <img
          className={styles.cardSizeMc}
          src={dinnerClub}
        />
        <img
          className={styles.cardSizeMc}
          src={discover}
        />
        
      </div>
    </div>
  );
}

{
  /* <FaCcVisa size={43} color={"#191970"} style={{ marginRight: '10px', marginLeft: '35px' }} />
<FaCcMastercard size={43} color={"#ff4600"} style={{ marginRight: '10px' }} />
<FaCcDiscover size={43} color={"#c0c0c0"} style={{ marginRight: '10px' }} />
<FaCcAmex size={43} color={"#191970"} style={{ marginRight: '10px' }} />
<FaCcJcb size={43} color={"#f00000"} style={{ marginRight: '10px' }} />
<FaCcDinersClub color={"#a2d1e9"} size={43} /> */
}
