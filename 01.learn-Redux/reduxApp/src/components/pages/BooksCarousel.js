"user strict";

import React, { PropTypes, Component } from "react";
import { Carousel } from "react-responsive-carousel";

// general styles
import "react-responsive-carousel/lib/styles/main.css";

// carousel styles
import "react-responsive-carousel/lib/styles/carousel.min.css";

class BooksCarousel extends Component {
    render() {
        return (
            <Carousel
                autoPlay={true}
                width="100%"
                showArrows={true}
                dynamicHeight={true}
                infiniteLoop={true}
            >
                <div>
                    <img src="images/The-clean-coder-cover.jpg" />
                    <p className="legend">The clean coder</p>
                </div>

                <div>
                    <img src="images/The-pragmatic-programmer-cover.jpg" />
                    <p className="legend">The pragmatic programmer</p>
                </div>

                <div>
                    <img src="images/The-C-programming-cover.jpg" />
                    <p className="legend">The C programming</p>
                </div>

                <div>
                    <img src="images/Books-to-make-you-a-better-Developer-cover.jpg" />
                    <p className="legend">
                        Books to make you a better Developer
                    </p>
                </div>

                <div>
                    <img src="images/linux-Programming-by-Example-cover.jpg" />
                    <p className="legend">linux Programming by Example</p>
                </div>

                <div>
                    <img src="images/programming-in-C++-cover.jpg" />
                    <p className="legend">programming in C++</p>
                </div>

                <div>
                    <img src="images/Pyschology-of-computer-programming-cover.jpg" />
                    <p className="legend">Pyschology of computer programming</p>
                </div>

                <div>
                    <img src="images/coding-on-weekend-cover.jpg" />
                    <p className="legend">coding on weekend</p>
                </div>

                <div>
                    <img src="images/JavaScript-and-JQuery-cover.png" />
                    <p className="legend">JavaScript and JQuery</p>
                </div>
            </Carousel>
        );
    }
}

export default BooksCarousel;
