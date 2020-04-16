import React from 'react';
import DeckGL from '@deck.gl/react';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';

class EditableMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geojson: {
        type: 'FeatureCollection',
        features: []
      }
    };
  }

  render() {
    const editableLayer = new EditableGeoJsonLayer({
      id: 'geojson',
      data: this.state.geojson,
      mode: 'drawPoint',
      onEdit: ({ updatedData }) => {
        this.setState({ geojson: updatedData });
      }
    });
    return (
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[editableLayer]}
      >
      </DeckGL>
    );
  }
}

export default EditableMap;
