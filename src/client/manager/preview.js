import React from 'react';

export class AppetizePreview extends React.Component {
  style = {
    iframe: {
      border: 'none',
    },
  }

  devices = {
    nexus5: {
      ratio: {
        scaleToHeight: 100/795,
        widthToHeight: 400/795,
      }
    },
    iphone6: {
      ratio: {
        scaleToHeight: 100/870,
        widthToHeight: 416/870,
      }
    }
  }

  constructor(props, ...args) {
    super(props, ...args);
  }

  render() {
    const { pubKey, device, height } = this.props;
    const ratio = this.devices[device].ratio;
    const scale = Math.floor(ratio.scaleToHeight*height);
    const width = Math.floor(ratio.widthToHeight*height);

    return (
      <iframe
        style={this.style.iframe}
        src={`https://appetize.io/embed/${pubKey}?device=${device}&scale=${scale}`}
        width={width}
        height={height}
        scrolling="no"
      />
    );
  }
}

export default class Preview extends React.Component {
  style = {
    container: {
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paragraph: {
      margin: 0,
      fontFamily: 'sans-serif',
    },
  }

  constructor(props, ...args) {
    super(props, ...args);
  }

  render() {
    if (this.props.appetize) {
      return this.renderAppetize();
    }
    return (
      <div style={this.style.container}>
        <p style={this.style.paragraph}>
          Please check your device or simulator
        </p>
      </div>
    );
  }

  renderAppetize() {
    const children = [];

    if (this.props.appetize.android) {
      const key = this.props.appetize.android;
      children.push((
        <AppetizePreview pubKey={key} device='nexus5' height={600} />
      ));
    }

    if (this.props.appetize.ios) {
      const key = this.props.appetize.ios;
      children.push((
        <AppetizePreview pubKey={key} device='iphone6' height={600} />
      ));
    }

    return (
      <div style={this.style.container}>
        {children}
      </div>
    );
  }
}
