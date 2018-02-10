import React from 'react'
import CircularProgress from "material-ui/CircularProgress"
import Divider from "material-ui/Divider"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "../components/atoms/TextField"
import GoogleIcon from "react-icons/lib/fa/google"
import conctrLogo from "../imgs/conctr-logo.png"
import Logo from "../imgs/logoImage.jpg"
import backgroundImageFile from "../imgs/placeholder-background.svg"
import GoogleLogin from 'react-google-login'

// class LoginPage extends Component {
//   state = {
//     token: null,
//     error: null
//   }

//   // Google 0Auth Login
//   handleGoogleLoginSuccess = (status, response) => {
//     console.log('response', response)
//     const email = response.profile.email
//     const provider = response._provider
//     const accessToken = response.token.accessToken
//     if (status === "signIn") {
//       authSignIn(email, provider, accessToken)
//         .then(conctrUser => {
//           this.setState({ token: conctrUser.jwt })
//         })
//         .catch(err => {
//           const conctrError = {
//             conctrError: err.response.data.error
//           }
//           this.setState({ error: conctrError })
//         })
//     }
//     if (status === "register") {
//       authRegister(email, provider, accessToken)
//         .then(conctrUser => {
//           this.setState({ token: conctrUser.jwt })
//         })
//         .catch(err => {
//           const conctrError = {
//             conctrError: err.response.data.error
//           }
//           this.setState({ error: conctrError })
//         })
//     }
//   }
//   handleGoogleLoginFailure = (status, response) => {
//     if (status === "signIn") {
//       if (response.message) {
//         const googleError = {
//           error: response.message
//         }
//         this.setState({ error: googleError })
//       }
//     }
//     // register
//     if (status === "register") {
//       if (response.message) {
//         const googleError = {
//           error: response.message
//         }
//         this.setState({ error: googleError })
//       }
//     }
//   }

const LoginPage = ({
  GoogleLoginSuccess,
  GoogleLoginFailure,
  GoogleRegisterSuccess,
  GoogleRegisterFailure
}) => {
  return (
    <div>
        <GoogleLogin
          clientId="623084099025-ru09r0q5rhjguaj4n348umdjcllr3hrp.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={(response) => {
            GoogleLoginSuccess(response, 'signIn')
          }}
          onFailure={(response) => {
            GoogleLoginFailure(response, 'signIn')
          }}
        />
        <GoogleLogin
          clientId="623084099025-ru09r0q5rhjguaj4n348umdjcllr3hrp.apps.googleusercontent.com"
          buttonText="Register With Google"
          onSuccess={(response) => {
            GoogleRegisterSuccess(response, 'register')
          }}
          onFailure={(response) => {
            GoogleRegisterSuccess(response, 'register')
          }}
        />
      {/* <SocialButton
        provider="google"
        appId="623084099025-ru09r0q5rhjguaj4n348umdjcllr3hrp.apps.googleusercontent.com"
        onLoginSuccess={(response) => {
          GoogleLoginSuccess(response, 'signIn')
        }}
        onLoginFailure={(response) => {
          GoogleLoginFailure(response, 'signIn')
        }}
      >
        Login with google
      </SocialButton>
      <SocialButton
        provider="google"
        appId="623084099025-ru09r0q5rhjguaj4n348umdjcllr3hrp.apps.googleusercontent.com"
        onLoginSuccess={(response) => {
          GoogleLoginSuccess(response, 'register')
        }}
        onLoginFailure={(response) => {
          GoogleLoginFailure(response, 'register')
        }}
      >
        Register With Google
      </SocialButton> */}
    </div>
  )
}

export default LoginPage


// export default class LoginPage extends Component {
//   state = {
//       createAccount: false,
//       email: "",
//       password: "",
//       loading: false
//   }

//   componentDidMount() {
//     // init google auth
//     oauthApi.start(
//       this.changeLoading,
//       this.props.setToken,
//       this.props.handleErrors
//     );
//   }

//   render() {
//     const useColor = false;
//     const backgroundColor = "#C8C8C8";

//     return (
//       <div
//         className="login-background"
//         style={
//           !useColor
//             ? {
//                 backgroundImage: `url(${backgroundImageFile})`
//               }
//             : {
//               background: `${backgroundColor}`
//             }
//         }
//       >
//         <div className="conctr-footer-box">
//           <div className="conctr-footer-text">powered by</div>
//           <a href="https://conctr.com/">
//             <img
//               src={conctrLogo}
//               alt="conctr logo"
//               className="conctr-footer-logo"
//             />
//           </a>
//         </div>
//         <div className="welcome-container">
//           {this.state.loading ? (
//             <CircularProgress />
//           ) : (
//               <div className="login-dialog">
//                 <img
//                   src={Logo}
//                   alt="app logo"
//                   className="app-login-logo"
//                 />
//                 <div>
//                   <div className="element" />
//                   <div className="login-text-fields">
//                     <TextField
//                       id="email"
//                       floatingLabelText="Email"
//                       fullWidth={true}
//                       onChange={this.onInputChange}
//                       onEnterKeyDown={() =>
//                         this.submitToAuth(this.props.onSignIn)
//                       }
//                       value={this.state.email}
//                       hintText="Email"
//                     />
//                     <TextField
//                       id="password"
//                       floatingLabelText="Password"
//                       fullWidth={true}
//                       onChange={this.onInputChange}
//                       onEnterKeyDown={() =>
//                         this.submitToAuth(this.props.onSignIn)
//                       }
//                       value={this.state.password}
//                       hintText="Password"
//                       type="password"
//                     />
//                   </div>
//                   <RaisedButton
//                     className="login-button"
//                     label="Log in"
//                     onTouchTap={() => this.submitToAuth(this.props.onSignIn)}
//                   />
//                   <RaisedButton
//                     className="login-button"
//                     label="Log in with Google"
//                     onTouchTap={() => oauthApi.signIn("signin")}
//                     icon={<GoogleIcon className="button-icon" />}
//                   />
//                   <div className="login-divider">
//                     <Divider />
//                   </div>
//                   <div className="login-text">Device, but no account?</div>
//                   <RaisedButton
//                     className="login-button"
//                     label="Register with Google"
//                     onTouchTap={() => oauthApi.signIn("register")}
//                     primary={true}
//                     icon={<GoogleIcon className="button-icon" />}
//                   />
//                 </div>
//               </div>
//             )}
//         </div>
//       </div>
//     );
//   }
// }
