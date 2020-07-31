import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {getStories} from '../../../_actions/story_actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import '../../assets/medium.css'

class StoriesShow extends Component {
 
  state = {
      loading:true
  }
  componentDidMount() {
      this.props.getStories();
      
  }
  
 


  renderStories() {

    
		return _.map(this.props.stories, article => {

		
	  	return (
         
            <div className="post-panel mt-5">

            <div className="post-metadata">
                <img alt="" className="avatar-image" src={article.author.provider_pic} height="40" width="40"/>
                <div className="post-info">
                    <div data-react-className="PopoverLink">
                    <span className="popover-link" data-reactroot=""><a href={`/profile/${article.author._id}`}>{article.author.name}</a></span></div>
                    <small>Posted • A must read</small>
                </div>
            </div>

            {/* {article.feature_img.length > 0 ? <div class="post-picture-wrapper">
                <img src={article.feature_img} alt="Thumb" />
            </div>:''} */}

            <div className="main-body">
                <h2 class="ui-h2 ui-xs-h4 ui-clamp3">{article.title}</h2>
                <div className="post-body">
                    <p className="" dangerouslySetInnerHTML={{__html: article.content}}></p>
                    <b><a>{article.author._id.name}</a></b>
                </div>
                <a className="read-more" href={`/articleview/${article._id}`}>Read more</a>
            </div>

            <div className="post-stats clearfix">
                <div className="pull-left">
                    <div className="like-button-wrapper">
                        <form className="button_to" method="get" action="">
                            <button className="like-button" data-behavior="trigger-overlay" type="submit"><i className="fa fa-heart-o"></i><span className="hide-text">Like</span></button></form>
                        <span className="like-count">{article.claps}</span>
                    </div>

                </div>

                <div className="pull-right">
                    <div className="bookmark-button-wrapper">
                        <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit">      <span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span></button></form>
                    </div>

                </div>

                <div className="response-count pull-right">
                </div>
            </div>
        </div>
	  	)
	  })
  }
  

  render() {
      
  	return (
  		<div className="ui two column centered grid">

              <div className="container-fluid main-container">
                    <div className="col-md-6 col-md-offset-1 dashboard-main-content">
                        <div className="posts-wrapper animated fadeInUp" data-behavior="endless-scroll" data-animation="fadeInUp-fadeOutDown">
                        {this.props.loading ?<Fragment>
                            <h3>Loading .....</h3>
                            
                        </Fragment>:<Fragment>
                        {this.renderStories()}
                        </Fragment> }
                        </div>
                    </div>
                  
                </div>
  		</div>
		)
 	}
}

function mapStateToProps(state) {
	console.log(state)
    return { stories: state.story.stories,
            loading:state.story.loading
    };
}
export default connect(mapStateToProps, {getStories})(StoriesShow)