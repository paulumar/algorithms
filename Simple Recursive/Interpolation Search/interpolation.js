// import visualization libraries {
const { Tracer, Array1DTracer, ChartTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');
// }

// define tracer variables {
const chart = new ChartTracer();
const tracer = new Array1DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([chart, tracer, logger]));
const D = Randomize.Array1D({ N: 15, value: () => Randomize.Integer({ min: 23, max: 250 }), sorted: true });
tracer.set(D);
tracer.chart(chart);
Tracer.delay();
// }

// define input variables

const element = D[Randomize.Integer({ min: 0, max: D.length - 1 })];

function interpolationSearch(arr, lo, hi, x){
  let pos;

    // visualize {
    tracer.select(lo);
    tracer.select(hi);
    Tracer.delay();
    //}
    
  // Since array is sorted, an element present
  // in array must be in range defined by corner
    
  if (lo <= hi && x >= arr[lo] && x <= arr[hi]) {
      
    // Probing the position with keeping
    // uniform distribution in mind.
    pos = lo + Math.floor(((hi - lo) / (arr[hi] - arr[lo])) * (x - arr[lo]));
    
    // visualize {
    tracer.patch(pos);
    Tracer.delay();
    logger.println(`hi: ${hi}`);
    logger.println(`lo: ${lo}`);
    logger.println(`Searching ${element} at pos: ${pos}`);
    Tracer.delay();

    // }
      
    // Condition of target found
        if (arr[pos] == x){
            // visualize {
            tracer.deselect(hi);
            tracer.deselect(lo);
            Tracer.delay();
            logger.println(`${element} found at pos: ${pos}`);
            // }
          return pos;
        }
   
        // If x is larger, x is in right sub array
        if (arr[pos] < x){
            // visualize {
            tracer.deselect(hi);
            tracer.deselect(lo);
            tracer.depatch(pos);
            Tracer.delay();
            logger.println(`${element} is smaller than ${arr[pos]}`);
            logger.println(`lo becomes pos+1: ${pos+1}`);
            // }
          return interpolationSearch(arr, pos + 1, hi, x);
        }
   
        // If x is smaller, x is in left sub array
        if (arr[pos] > x){
            // visualize {
            tracer.deselect(hi);
            tracer.deselect(lo);
            tracer.depatch(pos);
            Tracer.delay();
            logger.println(`${element} is greater than ${arr[pos]}`);
            logger.println(`hi becomes pos-1: ${pos-1}`);
            // }

          return interpolationSearch(arr, lo, pos - 1, x);
        }
    }
    return -1;
}

interpolationSearch(D,0,D.length-1,element)

