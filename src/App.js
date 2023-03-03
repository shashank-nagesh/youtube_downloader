import React from 'react'
import Axios from 'axios';
import { youtube_parser } from './idGenerater'
import './App.css';
import axios from 'axios';

class YTD extends React.Component {
  constructor(){
    super()
    this.state = {
      url: '',
      urlResult720p: '',
      urlResult480p: '',
      urlResult360p: '',
      urlResultmp3: '',
    }
  }
  handleUrlChange = (e) =>{
    const url = e.target.value
    this.setState({url})
    // console.log(url)
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    const formData = {
      url: this.state.url
    }
    const ytID = youtube_parser(formData.url)
    // console.log(ytID)

    //This get operation is for converting youtube Video into mp3 Audio
    // const options = {
    //   method: 'GET',
    //   url: "https://youtube-mp36.p.rapidapi.com/dl",
    //   headers: {
    //     'X-RapidAPI-Key': 'fafc69d339msh20e8ff34fb541f7p12c8cbjsnca560ca3803f',
    //     'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
    //   },
    //   params: {
    //     id: ytID
    //   }
    // }

    const options = {
      method: 'GET',
      url: "https://ytstream-download-youtube-videos.p.rapidapi.com/dl",
      headers: {
        'X-RapidAPI-Key': 'fafc69d339msh20e8ff34fb541f7p12c8cbjsnca560ca3803f',
        'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
      },
      params: {
        id: ytID
      }
    }
    axios(options)
      .then((response) => {
        // console.log(response.data.link)
        console.log(response.data.adaptiveFormats[0].url)
        this.setState({
          urlResult720p: response.data.formats[2].url,
          urlResult360p: response.data.formats[1].url,
          urlResultmp3: response.data.formats[0].url,
          url: ''
        })
      })
      .catch((err) => {
        console.log(err)
      })
      
  }

  render(){
    return (
      <div className="App">
      <center> <h1 className="title"> Youtube Video Downloader</h1> </center>
      <center>
        <form onSubmit={this.handleSubmit} className="form">
          <input type="text" placeholder="enter the video link" value={this.state.url} onChange={this.handleUrlChange} className="form_input_text" />
          <br/>
          <input type="submit" className="form_submit" />
        </form>

        {
          this.state.urlResult720p ? <p>
          <a target="_blank" rel="noreferrer" href={this.state.urlResult720p}>Download 720p</a> || <a target="_blank" rel="noreferrer" href={this.state.urlResult360p}>Download 360p</a> || <a target="_blank" rel="noreferrer" href={this.state.urlResultmp3}>Download mp3</a>
          </p> : ''
        }   
      </center>
      
    </div>
    )
  }
}

export default YTD;
