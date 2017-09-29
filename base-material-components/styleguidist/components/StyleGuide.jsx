import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import StyleGuide from 'react-styleguidist/lib/rsg-components/StyleGuide';

const theme = createMuiTheme({
  palette: palette,
  typography: typography,
});

class StyleGuideRenderer extends React.Component {
  constructor(props) {
    super(props);
  }
  // children,
  render() {
    return (
      <div>hello</div>
//       <MuiThemeProvider theme={theme} >
//         <Typography component="body1" >
//           <div className={classes.root}>
//   <header className={classes.header}>
//     <div className={classes.content}>
//       <div className={classes.bar}>
//         <Logo>{title}</Logo>
//         <nav className={classes.nav}>
//           <a className={classes.headerLink} href="https://github.com/styleguidist/react-styleguidist/tree/master/docs">Docs</a>
//           <a className={classes.headerLink} href="https://github.com/styleguidist/react-styleguidist">GitHub</a>
//           <a className={classes.headerLink} href="https://gitter.im/styleguidist/styleguidist">Gitter</a>
//         </nav>
//       </div>
//     </div>
//   </header>
//   <main className={classes.content}>
//     {this.props.children}
//     <footer className={classes.footer}>
//       <Markdown text={`Generated with [React Styleguidist](${homepageUrl}) ❤️`} />
//     </footer>
//   </main>
// </div>
//         </Typography>
//       </MuiThemeProvider>
    );
  }
}

StyleGuideRenderer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StyleGuideRenderer()(StyleGuide);
