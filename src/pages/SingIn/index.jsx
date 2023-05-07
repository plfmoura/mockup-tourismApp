import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import style from "./singIn.module.css";
import axios from "axios";
import PreLoader from "../../components/PreLoader";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducer/userReducer";
import RegisterDone from "./Animation/RegisterDone";
import PasswordChecker from "../../components/PasswordChecker";
import { checkRegister } from "../../services/checkregister";
import { checkLogin } from "../../services/checklogin";

export default function SingIn({ setShow, change }) {
  const [login, setLogin] = useState(change);
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState(false);
  const [doneAnimation, setDoneAnimation] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useRef();
  const registerForm = useRef();
  const dispatch = useDispatch();

  // Function Register
  const handleRegister = async (e) => {
    e.preventDefault();
    //Aqui validamos os Campos
    let check = checkRegister(e);
    if (check != null) {
      setAuthError(check);
      setTimeout(() => {
        setAuthError("");
        e.target.name.style.border = "1px solid #33333333";
        e.target.email.style.border = "1px solid #33333333";
        e.target.password.style.border = "1px solid #33333333";
        e.target.confirmPassword.style.border = "1px solid #33333333";
      }, [5000]);
      return;
    }
    const options = {
      method: "POST",
      url: "https://tourismapi.herokuapp.com/register",
      headers: { "Content-Type": "application/json" },
      data: {
        name: `${e.target.name.value}`,
        email: `${e.target.email.value}`,
        password: `${e.target.password.value}`,
        idioms: "Português",
        profession: "Insira sua profissão",
        located: "Insira seu Estado",
        tel1: "Insira seu Telefone",
        tel2: "",
        about: "Conte algo sobre você",
        images: ["", "", "", ""],
        image_banner:
          "https://wallpapers.com/images/featured/2iuzyh711jo9bmgo.jpg",
        image_profile:
          "https://icon-library.com/images/user-icon-jpg/user-icon-jpg-5.jpg",
      },
    };
    try {
      await axios.request(options);
      showLoad();
      setStatus(true);
      e.target.reset();
      setTimeout(() => {
        setLogin(false);
      }, [4000]);
    } catch (error) {
      showLoad();
      setAuthError("Usuário já cadastrado");
      setTimeout(() => {
        setAuthError("");
        e.target.reset();
      }, [3000]);
    }
  };

  const showLoad = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, [4000]);
  };

  //function login
  const handleLogin = async (e) => {
    e.preventDefault();
    let check = checkLogin(e);
    if (check != null) {
      setAuthError(check);
      setTimeout(() => {
        setAuthError("");
        e.target.email_login.style.border = "1px solid #33333333";
        e.target.password_login.style.border = "1px solid #33333333";
      }, [5000]);
      return;
    }

    const options = {
      method: "POST",
      url: "https://tourismapi.herokuapp.com/login",
      headers: { "Content-Type": "application/json" },
      data: {
        email: `${e.target.email_login.value}`,
        password: `${e.target.password_login.value}`,
      },
    };
    setAuthError("");
    if (email === "") {
      loginForm.current.email_login.style.border = "2px solid #2ea9ff";
      setAuthError("Insira um endereço de email.");
      setTimeout(() => {
        setAuthError("");
        loginForm.current.email_login.style.border = "1px solid #33333333";
      }, [5000]);
      return;
    }
    let regexEmail =
      /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
    if (!regexEmail.test(email)) {
      loginForm.current.email_login.style.border = "2px solid #2ea9ff";
      setAuthError("Insira um email válido");
      setTimeout(() => {
        setAuthError("");
        loginForm.current.email_login.style.border = "1px solid #33333333";
      }, [5000]);
      return;
    }

    if (password === "") {
      loginForm.current.password_login.style.border = "2px solid #2ea9ff";
      setAuthError("Insira uma Senha.");
      setTimeout(() => {
        setAuthError("");
        loginForm.current.password_login.style.border = "1px solid #33333333";
      }, [5000]);
      return;
    }

    let emailInput = document.querySelector('#email_login')
    let passwordInput = document.querySelector('#password_login')
    emailInput.setAttribute("disabled", "disabled")
    emailInput.style.background = '#33333320'
    passwordInput.setAttribute("disabled", "disabled")
    passwordInput.style.background = '#33333320'

    try {
      showLoad();
      let response = await axios.request(options);
      dispatch(setUser(response.data.user));
      localStorage.setItem("azul_user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      e.target.reset();
      setTimeout(() => {
        showLoad();
      }, [3000]);
      emailInput.removeAttribute("disabled")
      passwordInput.removeAttribute("disabled");
      setShow(false);
    } catch (error) {
      showLoad();
      setTimeout(() => {
        setAuthError("Email ou Senha incorretos. Tente novamente.");
        setTimeout(() => {
          setAuthError("");
        }, [3000]);
        emailInput.removeAttribute("disabled")
        emailInput.style.background = '#fff'
        passwordInput.removeAttribute("disabled");
        passwordInput.style.background = '#fff'
      }, [4000]);
    }
  };

  const eraseInputHistory = () => {
    registerForm.current.reset();
    loginForm.current.reset();
  };

  useEffect(() => {
    setDoneAnimation(true);
    setTimeout(() => {
      setDoneAnimation(false);
      setStatus(false);
    }, [4000]);
  }, [status === true]);

  return (
    <div>
      {login ? (
        <form className={style.singInContainer} onSubmit={handleRegister}>
          <div className={style.formHeader}>
            <img src="azul.png" alt="Logo da Empresa Azul Turismo" />
            <span>Cadastre-se agora</span>
            <p>Faça seu cadastro agora e comece a explorar nossos passeios.</p>
          </div>
          <div className={style.formMain} style={{ minHeight: "250px" }}>
            {status ? (
              <RegisterDone play={doneAnimation} />
            ) : (
              <>
                <input type="text" placeholder="Insira seu nome" id="name" />
                <input type="text" placeholder="Insira seu email" id="email" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Insira uma senha"
                  id="password"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  id="confirmPassword"
                />
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    left: "-.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    name="showPassword"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ width: "20px", marginRight: 5 }}
                  />
                  <span
                    style={{
                      height: "16px",
                      fontSize: "15px",
                      color: "#333",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Mostrar campos de senha
                  </span>
                </div>
                <span
                  style={{textAlign: 'center', height: "16px", fontSize: "14px", color: "red" }}
                >
                  {authError}
                </span>
              </>
            )}
          </div>
          {!status && (
            <div className={style.formFooter}>
              <Button text="Cadastrar" type="submit" />
              {/* <FacebookAuth /> */}
              {/* <GoogleAuth /> */}
              <span
                onClick={() => {
                  setLogin(!login);
                  setShowPassword(false);
                  eraseInputHistory();
                }}
              >
                Já tem uma conta? <strong>Entrar</strong>
              </span>
            </div>
          )}
        </form>
      ) : (
        <form className={style.loginContainer} onSubmit={handleLogin}>
          <div className={style.formHeader}>
            <img src="azul.png" alt="Logo da Empresa Azul Turismo" />
            <span>Entre como usuário</span>
            <p>Entre agora e comece a explorar nossos passeios.</p>
          </div>
          <div className={style.formMain}>
            <input
              type="text"
              placeholder="Email cadastrado"
              id="email_login"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha de usuário"
              id="password_login"
            />
            <div
              style={{ display: "flex", position: "relative", left: "-3rem" }}
            >
              <input
                type="checkbox"
                name="showPassword"
                onClick={() => setShowPassword(!showPassword)}
                style={{ width: "20px", marginRight: 5 }}
              />
              <span
                style={{
                  height: "16px",
                  fontSize: "15px",
                  color: "#333",
                  whiteSpace: "nowrap",
                }}
              >
                Mostrar senha
              </span>
            </div>
            <span style={{textAlign: 'center', height: "16px", fontSize: "14px", color: "red" }}>
              {authError}
            </span>
          </div>
          <div className={style.formFooter}>
            {load ? (
              <>
                <PreLoader />
              </>
            ) : (
              <>
                <Button onPress={handleLogin} text="Entrar como Usuário" />
                {/* <FacebookAuth /> */}
                {/* <GoogleAuth /> */}
                <span
                  onClick={() => {
                    setLogin(!login);
                    setShowPassword(false);
                  }}
                >
                  Não é cadastrado? <strong>Cadastre-se</strong>
                </span>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
