import React from 'react';
import ReactDOM from 'react-dom';
import MyMapComponent from './components/App.js';

class MyFancyComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false
    }
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.showPolygonGeo = this.showPolygonGeo.bind(this);
    this.onMyPolygonCompleteResult = this.onMyPolygonCompleteResult.bind(this);
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker() {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick() {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  showPolygonGeo(title, polygon) {
    console.log('---------' + title + '-----------');
    if (polygon) {
      polygon.getPath().getArray().forEach(function(point) {
        console.log('lat: ' + point.lat() + ' - ' + 'lng: ' + point.lng());
      })  
    }
    
  }

  onMyPolygonCompleteResult(polygon) {
    var self = this;
    polygon.getPaths().forEach(function (path, index) {

      google.maps.event.addListener(path, 'insert_at', function () {
        self.showPolygonGeo('insert-at', polygon);
      });

      google.maps.event.addListener(path, 'remove_at', function () {
        self.showPolygonGeo('remove-at', polygon);
      });
    });

    google.maps.event.addListener(polygon, 'dragend', function () {
      self.showPolygonGeo('drag-end', polygon);
    });

  }


  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        onMyPolygonComplete={this.onMyPolygonCompleteResult}
      />
    )
  }
}

ReactDOM.render(
  <MyFancyComponent
  />

  , document.getElementById('root'));