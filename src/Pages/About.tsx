import { Component } from 'react';

export class About extends Component {
  static propTypes = {};

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a href="https://app.rs.school/">RS School</a>
        <a href="https://github.com/LoginovskyMax">Loginovsky Max</a>
      </div>
    );
  }
}

export default About;
