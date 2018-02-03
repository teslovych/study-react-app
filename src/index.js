import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'

import VideoList from './components/VideoList.component';
import VideoDetail from './components/VideoDetail.component';

import SearchBar from './components/SearchBar.component';

const API_KEY = 'AIzaSyCbryxq8GRVT5Qu4smiSspZcXBuwRMn4ys';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        }

        this.videoSearch('porsche');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoDebounced = _.debounce((term) => {
            this.videoSearch(term)
        }, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoDebounced}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('.container'));