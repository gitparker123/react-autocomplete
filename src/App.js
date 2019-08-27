import React from 'react';
import './App.css';
import AutoComplete from './AutoComplete';
import ArticleView from './ArticleView';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isVisibleAutoComplete : true,
        isVisibleArticleView : false,
        title: '',
        content: ''
      };
      this.showAutoComplete = this.showAutoComplete.bind(this);
      this.showArticleView = this.showArticleView.bind(this);
      this.setArticle = this.setArticle.bind(this);
  }

  showAutoComplete() {
    this.setState({
      isVisibleAutoComplete: true,
      isVisibleArticleView : false
    });
  }

  showArticleView() {
    this.setState({
      isVisibleAutoComplete: false,
      isVisibleArticleView : true
    });
  }

  setArticle(article) {
    this.setState({
      title: article['title'],
      content: article['content']
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-Component">
          <AutoComplete 
            open={this.state.isVisibleAutoComplete}
            onArticleViewShow={this.showArticleView}
            onSetArticle={this.setArticle} />
          <ArticleView 
            open={this.state.isVisibleArticleView}
            title={this.state.title} 
            content={this.state.content}
            onAutoCompleteShow={this.showAutoComplete} />
        </div>    
      </div>
    )
  }
}

export default App;
