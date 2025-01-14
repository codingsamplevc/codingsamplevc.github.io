'use strict';

const elem = React.createElement;

class MyButton extends React.Component{
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render(){
    if (this.state.clicked){
      return 'You clicked this.';
    }

    return elem(
      'button',
      { onClick: () => this.setState({ clicked: true }) },
      'Click'
    );
  }
}
