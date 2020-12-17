import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Bar from "./Component/Bar";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import AuthRoute from "./util/AuthRoute"
import PostView from "./Component/PostView"

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <Bar />
          <Route exact path="/" component={Home} />
          <AuthRoute component={Login}  exact path="/login"/>
          <AuthRoute component={Register}  exact path="/register"/>
          <Route component={PostView}  exact path="/posts/:postId"/>         
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
