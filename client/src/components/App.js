import React, { Suspense ,useState} from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import MovieDetail from "./views/MovieDetailPage/MovieDetail";
import FavoritePage from "./views/FavoritePage/FavoritePage";
import Exercise from "./views/Exercises/Exercise";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./commons/globalStyles";
import { lightTheme, darkTheme } from "./commons/Theme";
import Create from "../components/views/Exercises/Create"
import View from "../components/views/Exercises/Read"
import Edit from "./views/Exercises/Edit"
import Story from "../components/views/Story/Stories"
import CreateStory from "../components/views/Story/StoryCreate"
import Header from "../components/views/ExpenceTracker/Header"
import Track from "../components/views/ExpenceTracker/Track"
import { createStory } from "../_actions/story_actions";


function App() {
  // For dark mode
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      

      <Suspense fallback={<div>Loading...</div>}>

      <GlobalStyles/>
        <NavBar />
     
        <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route
              exact
              path="/movie/:movieId"
              component={Auth(MovieDetail, null)}
            />
            <Route
              exact
              path="/favorite"
              component={Auth(FavoritePage, null)}
            />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route exact path="/exp" component={Auth(Exercise, false)} />
            <Route exact path="/create" component={Auth(Create, true)} />
            <Route exact path="/view" component={Auth(View, true)} />
            <Route exact path="/edit/:id" component={Auth(Edit, true)} />
            <Route exact path="/stories" component={Auth(Story, false)} />
            <Route exact path="/image">
              <Header/>
              <Track/>
            </Route>

            {/* <Route exact path="/write-story" component={Auth(CreateStory, false)} /> */}

          </Switch>
        </div>
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
