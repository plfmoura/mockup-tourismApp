import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TourCard from "../../components/TourCard";
import style from "./home.module.css";
import SearchInput from "./SearchInput";
import Men from "../../assets/home/men.png";
import CarouselServices from "./CarouselServices";
import CarouselRatings from "./CarouselRatings";
import CustomerCard from "./CustomerCard";
import Button from "../../components/Button";
import { dataCustomer } from "../../services/dataCustomer";
import { NavBarContext } from "../../context/NavBarContext";
import { LoggedContext } from "../../context/LoggedContext";
import MobileSearchInput from "./SearchInput/MobileSearchInput";
import TopButton from "./TopButton";

export default function Home() {
  const state = useSelector((state) => state);
  const { products } = state.shopping;
  const { setBgColor, setPaymentFooter } = useContext(NavBarContext);
  const [filtered, setFiltered] = useState([])
  const [myRegion, setMyRegion] = useState("Todas as Regiões")
  const [showTop, setShowTop] = useState('')
  const { show, setShow, setChange } = useContext(LoggedContext);
  const [ searchFixed, setSearchFixed ] = useState(false)

  useEffect(() => {
    setFiltered(products)
  }, [products])

  useEffect(() => {
    // Subir a página após trocar de páginas 
    window.scrollTo(0, 0);
    // Estilização do footer na página de compra
    setPaymentFooter(false)
  }, [])

  // Para pegar a posição do Menu e alterar conforme a posição da página 
  const [position, setPosition] = useState()

  useEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY)
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();
    // condicional para mostrar de acordo com o valor mesmo que ele volte a 0 novamente 
    let checkBgPosition = position > 400 ? setBgColor(true) : setBgColor(false)
    let checkSearchPosition = position > 530 ? setSearchFixed(true) : setSearchFixed(false)
    return () => window.removeEventListener('scroll', updatePosition);
  }, [position])

  return (
    <div className={style.HomeContainer}>
      <TopButton />
      <header className={style.background}>
        <div className={style.titleContainer}>
          <p>Conheça o</p>
          <span>RIO</span>
          <p>com nossos</p>
          <span>Roteiros</span>
        </div>
        <div className={style.creativeContainer}>
          <img src={Men} alt="Criatvo Homem Rasgando a Tela" />
        </div>
      </header>
      <section className={style.searchInputContainer}>
        { searchFixed ? <MobileSearchInput setFiltered={setFiltered} setMyRegion={setMyRegion} setShowTop={setShowTop} />
        : <SearchInput setFiltered={setFiltered} setMyRegion={setMyRegion} setShowTop={setShowTop} /> }
      </section>
      <section className={style.servicesContainer}>
        <div style={{ display: `${showTop}` }}>
          <h3>
            Passeios mais <span>Populares</span>
          </h3>
          <CarouselServices
            setClass={style.servicesSlider}
            call={style.arrowAlign}
            children={products.slice(1, 10).map((tour) => (
              <TourCard
                key={tour.id}
                id={tour.id}
                title={tour.name}
                location={tour.located}
                price={tour.price}
                image={tour.imagens}
                rating={tour.rating}
              />
            ))}
          />
        </div>
        <h3>
          Passeios em <span>{myRegion}</span>
        </h3>

        <div className={style.servicesColumns}>
          {filtered.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              title={tour.name}
              location={tour.located}
              price={tour.price}
              image={tour.imagens}
              rating={tour.rating}
            />
          ))}
        </div>
      </section>
      <hr style={{ color: "#33333320",width: "80%", margin: "2rem auto 0 auto" }} />
      <section className={style.customerContainer}>
        <h2>Avaliações de Usuários</h2>
        <div className={style.customerContent}>
          <CarouselRatings
            setclass={style.servicesSlider}
            children={dataCustomer.map((item) => (
              <CustomerCard
                key={item.id}
                name={item.customerName}
                service={item.servicePicture}
                rating={item.customerRating}
                picture={item.customerProfilePicture}
              />
            ))}
          />
        </div>
        <div className={style.singInCreativeContainer}>
          <img
            src="https://a.cdn-hotels.com/gdcs/production195/d1275/6335ff9a-0425-4f56-98fb-93ad82b6409d.jpg"
            alt="Mulher descendo a escada do Pontal do Atalaia - Arraial do Cabo"
          />
          <div>
            <h2>Faça seu Cadastro</h2>
            <Button text='Cadastre-se' 
              onPress={() => { 
                setShow(true); 
                setChange(true)}} />
          </div>
        </div>
      </section>
    </div>
  );
}
