import React, { Component } from 'react';
import { StdContainer } from '../../styles/main';
import Logo from '../../assets/eFila.png';
import Logo1 from '../../assets/fila1.png';
import Logo2 from '../../assets/fila2.png';

import {
  getLoggedUserId,
  getLoggedUserName,
  getLoggedUserCompanyName
} from '../../services/auth';
import { ShowMessage } from '../../services/msg';

class Initial extends Component {
  state = {
    userid: 0,
    userName: '',
    companyName: ''
  };

  componentDidMount() {
    const loggedUserId = getLoggedUserId() ? getLoggedUserId() : 0;
    const loggedUserName = getLoggedUserName() ? getLoggedUserName() : '';
    const loggedUserCompany = getLoggedUserCompanyName()
      ? getLoggedUserCompanyName()
      : '';
    if (loggedUserId !== this.state.userid) {
      this.setState({ userid: loggedUserId });
      this.setState({ userName: loggedUserName });
      this.setState({ companyName: loggedUserCompany });
    }
  }

  render() {
    const dStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      marginLeft: '#left',
      marginTop: '#top',
      height: '#height',
      width: '#width'
    };
    const iStyle = {
      maxWidth: '#mw'
    };
    var aDStyles = [
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle,
      dStyle
    ];
    var aIStyles = [
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle,
      iStyle
    ];
    var iTop = 0;
    var iLeft = 0;
    var iHeight = 0;
    var iWidth = 0;
    for (let i = 0; i <= 19; i++) {
      iTop = this.getY();
      iLeft = this.getX();
      iHeight = this.getV(Math.ceil(iTop / 10));
      iWidth = this.getH(Math.ceil(iLeft / 10));
      var sTop = iTop.toString() + 'vh';
      var sLeft = iLeft.toString() + 'vh';
      var sHeight = iHeight.toString() + 'vh';
      var sWidth = iWidth.toString() + 'vh';
      aDStyles[i] = JSON.parse(
        JSON.stringify(aDStyles[i])
          .replace('#top', sTop)
          .replace('#left', sLeft)
          .replace('#height', sHeight)
          .replace('#width', sWidth)
      );
      var sMw =
        (iHeight > iWidth ? Math.ceil(iHeight / 2) : Math.ceil(iWidth / 2)) +
        'vh';
      aIStyles[i] = JSON.parse(JSON.stringify(aIStyles[i]).replace('#mw', sMw));
    }
    const LogoCompnents = [Logo, Logo1, Logo2];
    var logoSel = [];
    for (let i = 1; i <= 20; i++) {
      logoSel.push(this.randomint(1, 3));
    }
    return (
      <StdContainer fluid={true}>
        <ShowMessage />
        {[...Array(20).keys()].map(divnumber => (
          <span key={divnumber} style={aDStyles[divnumber]}>
            {
              <img
                src={LogoCompnents[logoSel[divnumber]]}
                style={aIStyles[divnumber]}
                alt={`fila ${divnumber}`}
              />
            }
          </span>
        ))}
      </StdContainer>
    );
  }

  randomint(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  getX() {
    const xPOs = [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16];

    return xPOs[this.randomint(0, 16)] * 10;
  }

  getH(x) {
    const hPOs = [
      5,
      10,
      10,
      15,
      15,
      20,
      20,
      30,
      50,
      40,
      40,
      30,
      20,
      15,
      15,
      10,
      10
    ];
    return hPOs[x - 1];
  }

  getV(x) {
    const vPOs = [10, 20, 30, 40, 30, 20, 10];
    return vPOs[x - 1];
  }

  getY() {
    const yPOs = [10, 20, 30, 40, 50, 60, 65];

    return yPOs[this.randomint(1, 7)];
  }
}

export default Initial;
