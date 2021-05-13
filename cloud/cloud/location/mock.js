/*
  object structure

 cityName: {
    features: [
      {
        center: [lng, lat],
        bbox: [southwest-lng, southwest-lat, northeast-lng, northeast-lat],
      },
    ],
  },

*/

module.exports.locationsMock = {
  antwerp: {
    features: [
      {
        center: [4.3997081, 51.2211097],
        bbox: [4.240662, 51.143438, 4.497881, 51.377641],
      },
    ],
  },
  'san francisco': {
    features: [
      {
        center: [-122.463, 37.7648],
        bbox: [
          -122.517689744302, 37.6044791770151, -122.354986187987,
          37.8324289465257,
        ],
      },
    ],
  },
  chicago: {
    features: [
      {
        center: [-87.6244, 41.8756],
        bbox: [
          -87.9310852234722, 41.6257400089756, -87.5077920639626,
          42.023136999691,
        ],
      },
    ],
  },
  toronto: {
    features: [
      {
        center: [-79.3849, 43.6529],
        bbox: [
          -79.639302406235, 43.5603428815601, -79.1134670108977,
          43.8554654957061,
        ],
      },
    ],
  },
};
