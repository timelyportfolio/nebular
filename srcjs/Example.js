import React from 'react';
import DeckGL from '@deck.gl/react';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import { Toolbox } from '@nebula.gl/editor';
import { ViewMode } from '@nebula.gl/edit-modes';
import { StaticMap } from 'react-map-gl';

export function Example(props) {
  const initialViewState = props.hasOwnProperty('initialViewState') ? props.initialViewState : {
    longitude: -122.43,
    latitude: 37.775,
    zoom: 12,
  };

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
      global.console.log(updatedData);
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
        style={{overflow: 'hidden'}}
      >
        {props.hasOwnProperty('mapboxApiAccessToken')
            ? <StaticMap mapboxApiAccessToken = {props.mapboxApiAccessToken} />
            : null
        }
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
