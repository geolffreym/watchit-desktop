/**
 * Created by gmena on 04-20-17.
 */


export default ({
	getMemoryLogWebFrame(webFrame) {
		// `console.log` omitted  (pads + limits to 15 characters for the output)
		const logMemDetails = (x) => {
			let toMb = (bytes) => (bytes / (1000.0 * 1000)).toFixed(2)
			console.log("object", x[0])
			console.log("count", x[1].count)
			console.log("size", toMb(x[1].size) + "MB")
			console.log("liveSize", toMb(x[1].liveSize) + "MB")
		}
		
		Object.entries(webFrame.getResourceUsage()).map(logMemDetails)
		console.log('------')
		
	},
	
	calcHealth: ({peers, seeds}) => {
		let ratio = peers > 0 ? (seeds / peers) : seeds;
		let normalizedRatio = Math.min(ratio / 5 * 100, 100);
		let normalizedSeeds = Math.min(seeds / 30 * 100, 100);
		let weightedRatio = normalizedRatio * 0.6;
		let weightedSeeds = normalizedSeeds * 0.4;
		let weightedTotal = weightedRatio + weightedSeeds;
		return ((weightedTotal * 3) / 100) | 0;
	},
	
	calcScreenSize: (imageSize = 200, mp = 20) => {
		/**
		 * Calculate screen size and pics using screen dim
		 * @type {HTMLElement}
		 */
		
		let width = window.screen.width
		let height = window.screen.height
		
		// Avoid full fill row
		imageSize = width > 1800 ? Math.floor(width / 10) : imageSize;
		let chunkSize = Math.floor(width / imageSize);
		let chunkHeight = ((width - (chunkSize * mp)) / chunkSize) * 1.66;
		return {width, height, chunkSize, chunkHeight}
	},
	
	sanitizeSubIndex: (k)=>{
		return k.split(' ')[0].trim()
	},
	
	invalidString: (string) => {
		/**
		 * Check for invalid string
		 * @param {string} string
		 * @return {boolean} invalid or valid string
		 */
		return (typeof string !== 'string'
			|| !string || /^\s*$/.test(string)
			|| string.length === 0)
	},
	
	groupBy: (xs, key) => {
		return xs.reduce((rv, x) => {
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}, {});
	}
})

