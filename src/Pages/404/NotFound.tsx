import { Component } from 'react';
interface Iprops {
  is404: (yes: boolean) => void;
}

export class NotFound extends Component<Iprops> {
  history = window.history;
  constructor(props: Iprops) {
    super(props);
  }
  componentDidMount(): void {
    this.props.is404(true);
  }
  componentWillUnmount(): void {
    this.props.is404(false);
  }
  render() {
    return (
      <div>
        <h2>NotFound</h2>
        <button onClick={() => this.history.back()}>Back</button>
      </div>
    );
  }
}

export default NotFound;
