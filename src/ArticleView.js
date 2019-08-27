import React from 'react';
import './ArticleView.css';

const ArticleView = (props) => {
    return (
        <>
        {
            props.open ?
            <div className="ArticleView">
                <h1 className="ArticleView-Title">
                    { props.title }
                    <label className="ArticleView-Back" onClick={props.onAutoCompleteShow}>Back ></label> 
                </h1> 
                <div className="ArticleView-Content" dangerouslySetInnerHTML={{__html: props.content}}/>
            </div> : ''
        }
        </>
    );
}

export default ArticleView;
