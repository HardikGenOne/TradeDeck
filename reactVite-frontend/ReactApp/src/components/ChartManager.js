import { createChart, CrosshairMode } from 'lightweight-charts';

function customizeChart(chartRef, data) {
  class ChartManager {
    constructor(domElement, data) {
      this.chart = null;
      this.klines = data;
      this.candleseries = null;
      this.xspan = 22500;
      this.lastCrosshairPosition = null;
      this.domElement = domElement;

      this.lineSeries = null;
      this.isUpdatingLine = null;
      this.startPoint = null;

      this.isHovered = false;
      this.selectedPoint = null; //null/0/1
      this.hoverThreshold = 0.01;

      this.isDragging = false;
      this.dragStartPoint = null;
      this.dragStartLineData = null;

      this.initializeChart();
      this.setData();
      this.subscribeToEvents();

    }

    initializeChart() {
      this.domElement.innerHTML = '';

      const chartProperties = {
        layout: {
          background: { color: '#ffffff' },
          textColor: '#000000',
        },
        width: this.domElement.clientWidth || 2000,
        height: this.domElement.clientHeight || 400,
        grid: {
          vertLines: { color: '#eee' },
          horzLines: { color: '#eee' },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      };

      this.chart = createChart(this.domElement, chartProperties);
      this.candleseries = this.chart.addCandlestickSeries();

      this.lineSeries = this.chart.addLineSeries()
    }

    setData() {
      const prebars = [...new Array(100)].map((_, i) => ({
        time: this.klines[0].time - (100 - i) * this.xspan,
      }));
    
      const postbars = [...new Array(100)].map((_, i) => ({
        time: this.klines[this.klines.length - 1].time + (i + 1) * this.xspan,
      }));
    
      this.candleseries.setData([...prebars, ...this.klines, ...postbars]);
    }

    subscribeToEvents() {
      this.chart.subscribeCrosshairMove(this.handleCrosshairMove.bind(this));
      this.chart.subscribeClick(this.handleChartClick.bind(this));
      this.domElement.addEventListener(
        "mousedown",
        this.handleMouseDown.bind(this)
      );
      this.domElement.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }

    handleCrosshairMove(param) {
      if (this.isUpdatingLine) return;
      if (!param || !param.point) return;
      const xTs = param.time
        ? param.time
        : this.klines[0]["time"] + param.logical * this.xspan;
      const yPrice = this.candleseries.coordinateToPrice(param.point.y);
      this.lastCrosshairPosition = { x: xTs, y: yPrice };
      console.log("Crosshair moved:", param);
      
      this.startPoint
        ? this.updateLine(xTs, yPrice)
        : this.handleHoverEffect(xTs, yPrice);
  
      if (this.isDragging) {
        const deltaX = xTs - this.dragStartPoint.x;
        const deltaY = yPrice - this.dragStartPoint.y;
  
        let newLineData;
        newLineData = this.dragStartLineData.map((point, i) =>
          this.selectedPoint !== null
            ? i === this.selectedPoint
              ? {
                  time: point.time + deltaX,
                  value: point.value + deltaY,
                }
              : point
            : {
                time: point.time + deltaX,
                value: point.value + deltaY,
              }
        );
  
        this.dragLine(newLineData);
      }
    }

    handleChartClick(param) {
      console.log("handleChartClick triggered");
      if (this.isUpdatingLine) return;
      if (this.isDragging) return;
      const xTs = param.time
        ? param.time
        : this.klines[0]["time"] + param.logical * this.xspan;
      const yPrice = this.candleseries.coordinateToPrice(param.point.y);
      this.isHovered
        ? this.startDrag(xTs, yPrice)
        : this.handleLineDrawing(xTs, yPrice);
    }

    handleLineDrawing(xTs, yPrice) {
      if (!this.startPoint) {
        this.startPoint = { time: xTs, price: yPrice };
      } else {
        const t1 = this.startPoint.time;
        const p1 = this.startPoint.price;
        const t2 = xTs;
        const p2 = yPrice;

        if (t1 === t2) {
          console.warn("Skipped drawing line with duplicate timestamps:", t1);
          return;
        }

        const orderedLine = t1 < t2
          ? [{ time: t1, value: p1 }, { time: t2, value: p2 }]
          : [{ time: t2, value: p2 }, { time: t1, value: p1 }];

        this.lineSeries.setData(orderedLine);
        this.startPoint = null;
        this.selectedPoint = null;
      }
    }

    updateLine(xTs, yPrice) {
      if (xTs <= this.startPoint.time) return; // prevent duplicate or reversed time
      this.isUpdatingLine = true;
      this.lineSeries.setData([
        { time: this.startPoint.time, value: this.startPoint.price },
        { time: xTs, value: yPrice },
      ]);
      this.selectedPoint = null;
      this.isUpdatingLine = false;
    }

    isLineHovered(xTs, yPrice, point1, point2) {
      // CHECK IF POINT IS SELECTED
      if (this.isDragging) return true;
      const isPoint1 =
        xTs === point1.time &&
        (Math.abs(yPrice - point1.value) * 100) / yPrice < this.hoverThreshold;
      if (isPoint1) {
        this.selectedPoint = 0;
        return true;
      }
      const isPoint2 =
        xTs === point2.time &&
        (Math.abs(yPrice - point2.value) * 100) / yPrice < this.hoverThreshold;
      if (isPoint2) {
        this.selectedPoint = 1;
        return true;
      }
  
      this.selectedPoint = null;
      const m = (point2.value - point1.value) / (point2.time - point1.time);
      const c = point1.value - m * point1.time;
      const estimatedY = m * xTs + c;
      return (Math.abs(yPrice - estimatedY) * 100) / yPrice < this.hoverThreshold;
    }

    handleHoverEffect(xTs, yPrice) {
      const linedata = this.lineSeries.data();
      if (!linedata.length) return;
  
      const hoverStatus = this.isLineHovered(
        xTs,
        yPrice,
        linedata[0],
        linedata[1]
      );
      if (hoverStatus && !this.isHovered) {
        this.startHover();
      }
  
      if (!hoverStatus && this.isHovered && !this.isDragging) {
        this.endHover();
      }
    }
    
    handleMouseDown() {
      if (!this.lastCrosshairPosition) return;
      if (this.isHovered) {
        this.startDrag(
          this.lastCrosshairPosition.x,
          this.lastCrosshairPosition.y
        );
      }
    }
    
    handleMouseUp() {
      this.endDrag();
    }

    startHover() {
      this.isHovered = true;
      this.lineSeries.applyOptions({ color: "orange" });
      this.domElement.style.cursor = "pointer";
      this.chart.applyOptions({ handleScroll: false, handleScale: false });
    }
  
    endHover() {
      this.isHovered = false;
      this.lineSeries.applyOptions({ color: "dodgerblue" });
      this.domElement.style.cursor = "default";
      this.chart.applyOptions({ handleScroll: true, handleScale: true });
    }

    startDrag(xTs, yPrice) {
      console.log("startDrag triggered");
      this.isDragging = true;
      this.dragStartPoint = { x: xTs, y: yPrice };
      this.dragStartLineData = [...this.lineSeries.data()];
    }
    
    endDrag() {
      console.log("endDrag triggered");
      this.isDragging = false;
      this.dragStartPoint = null;
      this.dragStartLineData = null;
      this.selectedPoint = null;
    }
    
    dragLine(newCords) {
      this.isUpdatingLine = true;

      // Check for valid data length
      if (newCords.length < 2) {
        console.warn("Invalid line data length:", newCords);
        this.isUpdatingLine = false;
        return;
      }

      const [p1, p2] = newCords;

      // Skip if both points are exactly the same
      if (p1.time === p2.time && p1.value === p2.value) {
        console.warn("Skipped updating line due to duplicate coordinates:", newCords);
        this.isUpdatingLine = false;
        return;
      }

      // Ensure time is strictly increasing
      if (p2.time <= p1.time) {
        console.warn("Skipped updating line due to non-increasing timestamps:", newCords);
        this.isUpdatingLine = false;
        return;
      }

      this.lineSeries.setData(newCords);
      this.isUpdatingLine = false;
    }
  }

  new ChartManager(chartRef, data);
}

export default customizeChart;