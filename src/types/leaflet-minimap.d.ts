import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    class MiniMap extends L.Control {
      constructor(layer: L.Layer, options?: any);
    }
  }
}
