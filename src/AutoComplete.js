import React from 'react'
import './AutoComplete.css'

export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.items = [];  // all articles list
        this.loadItems(); // load article data into items from given url
        this.state = {
            titles: [],   // matching titles when user change the value of input
            text: '',     // value of the input when select one of the matching titles. 
            articles: [], // articles which has matching title with input value
        };
    }

    componentDidUpdate(oldProps) {
        if(oldProps.open === false) {
            this.setState({ text : '' })
        }
    }

    loadItems = () => { 
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',   // set a CORS proxy (when No 'Access-Control-Allow-Origin' header is present on the requested resource) => https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
        targetUrl = 'https://staging-cdn.simpo.io/articles.json' // set target url which get data from
        fetch(proxyUrl + targetUrl) // fetch data from url
        .then(blob => blob.json())  // convert data as json 
        .then(data => {             
            console.table(data);    // show fetched data (You can see it in chrome dev tool console by press key f12)
            data.map((item) => {this.items.push(item);}); // load fetched data into items
            return data;
        })
        .catch(e => {
            console.log(e);
            return e;
        });
    }

    onTextChanged = (e) => { // when change text of the input(input or delete)
        const value = e.target.value; // current value of the input
        let articles = [], titles = []; // variables for saving articles and titles matching with input value
        if(value.length > 0) { // when the input value is not empty(string)
            const regex = new RegExp(`^${value}`, 'i'); // regular expression for choosing all titles which includes 'value'
            articles = this.items.sort().filter(v => regex.test(v['title'])); // set articles value as compared result with regular expression
            articles.forEach(article => { // set titles value as articles's title
                titles.push(article['title']);
            });
        } 
        this.setState(() => ({titles, text: value})); // set state of titles, text, articles
    }

    renderTitles(){ // show titles list under input tag
        const { titles } = this.state;
        if(titles.length === 0) {
            return null;
        }
        return (
            <ul>
                {titles.map((item, index) => <li key={'title_'+index} onClick={() => this.titleSelected(item)}>{item}</li>)}
            </ul>
        )
    }

    titleSelected (value) { // when select one of title list
        const regex = new RegExp(`^${value}`, 'i');
        let articles = this.items.sort().filter(v => regex.test(v['title']));
        this.setState(() => ({
            text: value,
            titles: [],
            articles
        }))
        this.props.onArticleViewShow();
        this.props.onSetArticle(articles[0]);
    }

    render() { // render component
        const { text } = this.state;
        return (
            <>
            {
                this.props.open ?
                <div className="AutoComplete">
                    <center className="AutoComplete-Title">Search All Articles</center>
                    <div className="AutoComplete-Content">
                        <input value={text} type="text" onChange={this.onTextChanged} placeholder="Start typing here..."/>
                        {this.renderTitles()}
                    </div>   
                </div> : ''
            }
            </>   
        )
    }
}