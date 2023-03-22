import { Component } from 'react';
interface IProps {
  is404: (yes: boolean) => void;
}

export class NotFound extends Component<IProps> {
  history = window.history;
  constructor(props: IProps) {
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
