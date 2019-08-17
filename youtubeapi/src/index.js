import _ from 'lodash';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAmAozHgHo9o5ej639DRcAT5nxoDBudp9w';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('mortal Kombat sco');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[1]
      }); //Same as this.setState({ videos : videos })
    });
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    });

    return (
      <div>
      
       <img src = "https://www.androidguys.com/wp-content/uploads/2018/07/YouTube-Dark-Mode.jpg" width="100" alt="pic3"></img>
       <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
