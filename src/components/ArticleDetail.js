import React, { Component, Fragment } from 'react';

class ArticleDetail extends Component {
    state = {  }

    renderButtonsAuthBased = () => {
        return (
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        )
    }

    render() { 
        return (  
            <Fragment>
                <h3 className="text-dark">Snowboard</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore qui fugiat culpa neque accusamus exercitationem modi quibusdam fuga architecto ratione atque blanditiis aliquid iste, unde quam earum corrupti doloremque! Est consequuntur quos qui officia dicta dolorum praesentium, quidem blanditiis quasi eum reiciendis! Id aliquam placeat natus provident, velit, sapiente nihil voluptatem beatae dolores iusto vero laboriosam a consectetur commodi earum eius nulla! Incidunt deserunt quia quos! Adipisci aliquam libero possimus debitis ad, veritatis magnam omnis quibusdam id culpa corporis, nemo impedit aspernatur dolor placeat fugiat sequi sint corrupti. Perferendis dolorum itaque reiciendis explicabo eos eveniet repellendus unde necessitatibus totam deserunt aliquid, adipisci dicta tempore id possimus dolores quis eligendi aliquam? Fugit architecto accusamus ex eos, magnam, inventore repudiandae totam aliquam facilis aut itaque alias omnis perferendis praesentium aspernatur eveniet nesciunt. Recusandae ipsam similique maxime libero minus dignissimos! Tempore officia voluptate magnam natus amet similique non nobis dolor, eligendi optio quis veniam cupiditate cumque mollitia inventore maiores ex, laboriosam, harum explicabo blanditiis! Minus accusamus aliquid voluptatem, blanditiis, alias iste perspiciatis nesciunt quia unde et atque non labore molestiae illo, tenetur consequatur delectus. Animi, dolore expedita, labore, beatae nulla facilis libero possimus inventore fuga provident qui dolorum vel magni doloremque culpa amet.</p>
                {this.renderButtonsAuthBased()}
            </Fragment>
        );
    }
}
 
export default ArticleDetail;