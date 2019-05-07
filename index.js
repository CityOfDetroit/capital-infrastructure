import Controller from './components/controller.class';
const turf = require('@turf/turf');

(function start() {
  
  const controller = new Controller(document.querySelector('.content-section'));
  const delay = 500; // delay between calls
  let throttled = false; // are we currently throttled?

  controller.map.map.on('mousemove', function (e, parent = this) {
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['dpw-residential-resurfacing']
    });
    if (features.length) {
      controller.map.map.setFilter('dpw-residential-resurfacing-hover', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
    }else{
      features = this.queryRenderedFeatures(e.point, {
        layers: ['dpw-c-resurfacing']
      });
      if (features.length) {
        controller.map.map.setFilter('dpw-c-resurfacing-hover', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
      }else{
        features = this.queryRenderedFeatures(e.point, {
          layers: ['dpw-major-resurfacing']
        });
        if (features.length) {
          controller.map.map.setFilter('dpw-major-resurfacing-hover', ['==', 'ObjectId', features[0].properties.ObjectId]);
        }else{
          features = this.queryRenderedFeatures(e.point, {
            layers: ['streetscape']
          });
          if (features.length) {
            controller.map.map.setFilter('streetscape-hover', ['==', 'FID', features[0].properties.FID]);
          }else{
            controller.map.map.setFilter('streetscape-hover', ['==', 'FID', ""]);
          }
          controller.map.map.setFilter('dpw-major-resurfacing-hover', ['==', 'ObjectId', ""]);
        }
        controller.map.map.setFilter('dpw-c-resurfacing-hover', ['==', 'OBJECTID', ""]);
      }
      controller.map.map.setFilter('dpw-residential-resurfacing-hover', ['==', 'OBJECTID', ""]);
    }
    this.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  controller.map.map.on('click', function (e, parent = this) {
    console.log(e);
    let point = turf.point([e.lngLat.lng, e.lngLat.lat]);
    console.log(point);
    controller.map.map.getSource('single-point').setData(point.geometry);
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['dpw-residential-resurfacing']
    });
    if (features.length) {
      console.log(features[0]);
      controller.updatePanel(features[0], controller);
      controller.map.map.setFilter('dpw-residential-resurfacing-featured', ['==', 'OBJECTID', '']);
      controller.map.map.setFilter('dpw-residential-resurfacing-featured', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
      document.querySelector('.data-panel').className = 'data-panel active';
    }else{
      features = this.queryRenderedFeatures(e.point, {
        layers: ['dpw-c-resurfacing']
      });
      if (features.length) {
        console.log(features[0]);
        controller.updatePanel(features[0], controller);
        controller.map.map.setFilter('dpw-c-resurfacing-featured', ['==', 'OBJECTID', '']);
        controller.map.map.setFilter('dpw-c-resurfacing-featured', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
        document.querySelector('.data-panel').className = 'data-panel active';
      }else{
        features = this.queryRenderedFeatures(e.point, {
          layers: ['dpw-major-resurfacing']
        });
        if (features.length) {
          console.log(features[0]);
          controller.updatePanel(features[0], controller);
          controller.map.map.setFilter('dpw-major-resurfacing-featured', ['==', 'ObjectId', '']);
          controller.map.map.setFilter('dpw-major-resurfacing-featured', ['==', 'ObjectId', features[0].properties.ObjectId]);
          document.querySelector('.data-panel').className = 'data-panel active';
        }else{
          features = this.queryRenderedFeatures(e.point, {
            layers: ['streetscape']
          });
          if (features.length) {
            console.log(features[0]);
            controller.updatePanel(features[0], controller);
            controller.map.map.setFilter('streetscape-featured', ['==', 'FID', '']);
            controller.map.map.setFilter('streetscape-featured', ['==', 'FID', features[0].properties.FID]);
            document.querySelector('.data-panel').className = 'data-panel active';
          }else{
            controller.map.map.setFilter('streetscape-featured', ['==', 'FID', '']);
            controller.panel.clearPanel();
            document.querySelector('.data-panel').className = 'data-panel';
          }
          controller.map.map.setFilter('dpw-major-resurfacing-featured', ['==', 'ObjectId', '']);
        }
        controller.map.map.setFilter('dpw-c-resurfacing-featured', ['==', 'OBJECTID', '']);
      }
      controller.map.map.setFilter('dpw-residential-resurfacing-featured', ['==', 'OBJECTID', '']);
    }
  });
  // controller.map.geocoder.on('result', function (ev) {
  //   // console.log(ev);
  //   if(controller.geocoderOff){
  //     controller.geocoderOff = false;
  //     controller.geoResults(ev, controller);
  //   }else{
  //     console.log('extra call');
  //   }
  // });
  // document.getElementById('population').value = null;
  // document.getElementById('hardest').value = null;
  // document.getElementById('low-response').value = null;
  // document.getElementById('population').value = null;
  // document.getElementById('no-internet').value = null;
  document.getElementById('close-panel-btn').addEventListener('click', function () {
    controller.panel.clearPanel();
    (document.querySelector('.data-panel.active') != null) ?  document.querySelector('.data-panel.active').className = 'data-panel' : 0;
  });
  // document.getElementById('close-filters-btn').addEventListener('click', function () {
  //   document.querySelector('.filters.active').className = 'filters';
  // });
  // document.getElementById('filters').addEventListener('click', function () {
  //   document.querySelector('.filters').className = 'filters active';
  //   document.querySelector('.filters.active').focus();
  // });
  // const intFilters = document.querySelectorAll('.interactive-filters');
  // intFilters.forEach(function (btn) {
  //   btn.addEventListener('change', function (ev) {
  //     controller.filterMap(ev, controller);
  //   });
  // });
  // const filterBtns = document.querySelectorAll('.filter-btn');
  // filterBtns.forEach(function (btn) {
  //   btn.addEventListener('click', function (ev) {
  //     controller.removeFilter(ev, controller);
  //   });
  // });
  const startingBtns = document.querySelectorAll('#user-type-section button');
  startingBtns.forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      controller.initialForm(ev.target.attributes[2].nodeValue, controller);
    });
  });
  window.addEventListener('resize',()=>{
    if (!throttled) {
      // actual callback action
      controller.map.map.resize();
      // we're throttled!
      throttled = true;
      // set a timeout to un-throttle
      setTimeout(()=>{
        throttled = false;
      }, delay);
    }  
  })
})(window);
