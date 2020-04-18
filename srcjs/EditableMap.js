import React from 'react';
import DeckGL from '@deck.gl/react';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';

const initialViewState = {
  longitude: -122.43,
  latitude: 37.775,
  zoom: 12,
};

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
        controller={{
          doubleClickZoom: false,
        }}
        layers={[editableLayer]}
        getCursor={editableLayer.getCursor.bind(editableLayer)}
      >
      </DeckGL>
    );
  }
}

export function Example() {
  const [features, setFeatures] = React.useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [selectedFeatureIndexes] = React.useState([]);
  const [mode, setMode] = React.useState(() => ViewMode);

  const layer = new EditableGeoJsonLayer({
    data: features,
    mode,
    selectedFeatureIndexes,
    onEdit: ({ updatedData }) => {
      setFeatures(updatedData);
    },
  });

  return (
    <>
      <DeckGL
        initialViewState={initialViewState}
        controller={{
          doubleClickZoom: false,
        }}
        layers={[layer]}
        getCursor={layer.getCursor.bind(layer)}
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
      <Toolbox
        mode={mode}
        features={features}
        onSetMode={setMode}
        onImport={(featureCollection) =>
          setFeatures({
            ...features,
            features: [...features.features, ...featureCollection.features],
          })
        }
      />
    </>
  );
}

export default EditableMap;
