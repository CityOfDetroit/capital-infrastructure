import Controller from './components/controller.class';

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
        // features = this.queryRenderedFeatures(e.point, {
        //   layers: ['dpw-major-resurfacing']
        // });
        // if (features.length) {
        //   controller.map.map.setFilter('dpw-major-resurfacing-hover', ['==', 'GlobalID', features[0].properties.OBJECTID]);
        // }else{
        //   controller.map.map.setFilter('dpw-major-resurfacing-hover', ['==', 'GlobalID', ""]);
        // }
        controller.map.map.setFilter('dpw-c-resurfacing-hover', ['==', 'OBJECTID', ""]);
      }
      controller.map.map.setFilter('dpw-residential-resurfacing-hover', ['==', 'OBJECTID', ""]);
    }
    this.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
  controller.map.map.on('click', function (e, parent = this) {
    // console.log(e);
    let features = this.queryRenderedFeatures(e.point, {
      layers: ['dpw-residential-resurfacing']
    });
    if (features.length) {
      console.log(features[0]);
      controller.updatePanel(features[0], controller);
      controller.map.map.setFilter('census-featured', ['==', 'OBJECTID', '']);
      controller.map.map.setFilter('census-featured', ['==', 'OBJECTID', features[0].properties.OBJECTID]);
      document.querySelector('.data-panel').className = 'data-panel active';
    }else{
      // console.log('no featured');
      // controller.map.map.setFilter('census-featured', ['==', 'OBJECTID', '']);
      // controller.panel.clearPanel();
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
  document.getElementById('hardest').value = null;
  document.getElementById('low-response').value = null;
  document.getElementById('population').value = null;
  document.getElementById('no-internet').value = null;
  document.getElementById('close-panel-btn').addEventListener('click', function () {
    controller.panel.clearPanel();
    (document.querySelector('.data-panel.active') != null) ?  document.querySelector('.data-panel.active').className = 'data-panel' : 0;
  });
  document.getElementById('close-filters-btn').addEventListener('click', function () {
    document.querySelector('.filters.active').className = 'filters';
  });
  document.getElementById('filters').addEventListener('click', function () {
    document.querySelector('.filters').className = 'filters active';
    document.querySelector('.filters.active').focus();
  });
  const intFilters = document.querySelectorAll('.interactive-filters');
  intFilters.forEach(function (btn) {
    btn.addEventListener('change', function (ev) {
      controller.filterMap(ev, controller);
    });
  });
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      controller.removeFilter(ev, controller);
    });
  });
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
