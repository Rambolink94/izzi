import React, { Component } from "react";
import "./MovieStack.css";

class MovieStack extends Component {
  constructor(props) {
    super(props);

    this.stackRef = React.createRef();
  }

  state = {
    // All stacks start at start
    isAtStart: true,
    isAtEnd: false,
    movies: [],
  };

  componentDidMount() {
    window.addEventListener("resize", () => this.checkArrows());
    //This might be causing an error
    this.checkArrows();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.checkArrows());
  }

  render() {
    return (
      <div className="stack-wrapper">
        <h4 className="stack-title">{this.props.genre}</h4>
        <div className="stack">
          <div className="grid" ref={this.stackRef}>
            {this.props.children}
          </div>
          <div className="arrow-wrapper">
            {/* Consider making arrows components. Refactor regardless. */}
            <div
              className="right-arrow"
              style={
                !this.state.isAtEnd ? { display: "" } : { display: "none" }
              }
              onClick={() => this.scrollStack(false)}
            >
              <img
                className="arrow"
                src={process.env.PUBLIC_URL + "./icons/arrow.png"}
                alt="Arrow"
              ></img>
            </div>
            <div
              className="left-arrow"
              style={
                !this.state.isAtStart ? { display: "" } : { display: "none" }
              }
              onClick={() => this.scrollStack(true)}
            >
              <img
                className="arrow"
                src={process.env.PUBLIC_URL + "./icons/arrow.png"}
                alt="Arrow"
              ></img>
            </div>
          </div>
        </div>
      </div>
    );
  }

  checkArrows = () => {
    const stack = this.stackRef.current;
    const stackSize = stack.offsetWidth;

    if (stack.scrollLeft <= 0) this.setState({ isAtStart: true });
    else this.setState({ isAtStart: false });

    // Check if right should render
    console.log(stack.scrollLeft, ":", stackSize, " => ", stack.scrollWidth);
    if (stack.scrollLeft + stackSize >= stack.scrollWidth)
      this.setState({ isAtEnd: true });
    else this.setState({ isAtEnd: false });
  };

  scrollStack = (isLeft = true) => {
    const stack = this.stackRef.current;
    const stackSize = stack.offsetWidth;

    console.log("Stack Size:", stackSize);

    // Set scroll position
    if (isLeft) {
      console.log("Scroll: ", stack.scrollLeft - stackSize, " - ", 0);
      stack.scrollBy({ top: 0, left: -stackSize, behavior: "smooth" });
      if (stack.scrollLeft - stackSize <= 0) this.setState({ isAtStart: true });
      this.setState({ isAtEnd: false });
    } else {
      console.log(
        "Scroll: ",
        stack.scrollLeft + stackSize,
        " - ",
        stack.scrollWidth
      );
      stack.scrollBy({ top: 0, left: stackSize, behavior: "smooth" });
      if (stack.scrollWidth - (stack.scrollLeft + stackSize) < stackSize)
        this.setState({ isAtEnd: true });
      this.setState({ isAtStart: false });
    }

    console.log(stack.scrollWidth - stack.scrollLeft, " < ", stackSize);
    //(stack.scrollLeft) ? this.setState({ isAtStart: false }) : this.setState({ isAtStart: true });
  };
}

export default MovieStack;
