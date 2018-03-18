// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Notes
} from 'spectacle';

import CodeSlide from 'spectacle-code-slide';


// Import theme
import createTheme from 'spectacle/lib/themes/default';


// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quartenary: '#CECECE'
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica'
  }
);

// https://app.mindmup.com/map/_free/2018/03/e9c0df702a2811e8b24fcd4c7233e614

const slidesImports = [
  import("./slides/0_intro/intro_1"),
  import("./slides/0_intro/intro_2"),
  import("./slides/0_intro/intro_3"),
/*
voir plan.md 

*/
  
];

const codeSamples = {
  
}

localStorage.clear();

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.startTicker = this.startTicker.bind(this);
    this.stopTicker = this.stopTicker.bind(this);

    this.state = {
      slides: Array(slidesImports.length).fill(<Slide key="loading" />)
    };
  }

  componentDidMount() {
    const importedSlides = [];
    Promise.all(slidesImports).then((slidesImportsResolved) => {
      slidesImportsResolved.forEach((slide) => {
        importedSlides.push(slide.default);
      });
      this.setState({ slides: importedSlides });
      
    });
  }

  startTicker() {
    if (!this.ticker) {
      this.ticker = setInterval(() => {
        const now = new Date();
        console.log("tick tick");
        this.setState({tick: now});
      }, 300);
    }
  }

  stopTicker() {
    if (this.ticker) {
      clearInterval(this.ticker);
      this.ticker = undefined;
    }
  }

  render() {
    const { slides } = this.state;
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
        {
          slides.map((slide, index) => {

            if (codeSamples[index]) {
              return React.cloneElement(slide, {key: index, code: codeSamples[index](), onActive: this.startTicker});
            }
            
            return React.cloneElement(slide, {key: index, onActive: this.stopTicker });
          })
        }
      </Deck>
    );
  }
}
