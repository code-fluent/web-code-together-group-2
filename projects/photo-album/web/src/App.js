import React, { Component } from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedPhotos: []
    };
  }

  loadPhotos = () => {
    axios.get("http://localhost:8080/photos").then(response => {
      this.setState({
        photos: response.data
      });
    });
  };

  uploadPhoto = photo => {
    const formData = new FormData();
    formData.append("photo", photo);

    return axios.post("http://localhost:8080/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  };

  onPhotoSelected = async photos => {
    await this.uploadPhoto(photos[0]);
    this.loadPhotos();
  };

  componentDidMount() {
    this.loadPhotos();
  }

  render() {
    return (
      <div className="container">
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onPhotoSelected}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />

        <div className="photos">
          {this.state.photos.map(photo => (
            <img
              className="photo"
              key={photo.id}
              alt=""
              src={`http://localhost:8080/static/${photo.name}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
