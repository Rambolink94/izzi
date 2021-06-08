import React, { Component } from 'react';
import "./MovieStack.css";

class MovieStack extends Component {
    constructor(props) {
        super(props);
        
        this.stackRef = React.createRef();
    }

    state = {  }

    render() {
        return (
            <div className="stack-wrapper">
                <h4 className="stack-title">{this.props.genre}</h4>
                <div className="stack">
                    <div className="grid" ref={this.stackRef}>{this.props.children}</div>
                    <div className="arrow-wrapper">
                        {/* Consider making arrows components. Refactor regardless. */}
                        <div className="right-arrow" onClick={() => this.scrollStack(false)}><img className="arrow" src={process.env.PUBLIC_URL + "./icons/arrow.png"} alt="Arrow"></img></div>
                        <div className="left-arrow" onClick={() => this.scrollStack(true)}><img className="arrow" src={process.env.PUBLIC_URL + "./icons/arrow.png"} alt="Arrow"></img></div>
                    </div>
                </div>
            </div>
        );
    }

    scrollStack = (isLeft = true) => {
        const stack = this.stackRef.current;
        const stackSize = stack.offsetWidth;

        // Set scroll position
        if (isLeft) 
            stack.scrollBy({ top: 0, left: -stackSize, behavior: 'smooth'});
        else 
            stack.scrollBy({ top: 0, left: stackSize, behavior: 'smooth'});
    }
}

export default MovieStack;