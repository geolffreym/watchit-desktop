import React from 'react'
import AppMainResultBox from 'js/front/components/views/movie-index-components/app-main-movies-top-search-result-box/'
import PointsLoader from 'js/front/components/generic/util-points-loader/index.jsx'
import CustomScrollbars from 'js/front/components/generic/util-scroller/index.jsx';

export default class AppMainSearchResult extends React.Component {
	
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return !Object.is(nextProps.searching, this.props.searching) ||
			!Object.is(nextProps.result.length, this.props.result.length)
	}
	
	render() {
		return (
			<section className="absolute full-width search-result-box left-0 top-100-p z-index-100">
				{
					(this.props.searching &&
						<div className="col l12 m12 result-search-box text-center padding-10">
							<PointsLoader/>
						</div>
					) ||
					<CustomScrollbars
						autoHide
						autoHeight
						autoHeightMax={500}
						autoHideTimeout={1000}
						autoHideDuration={200}
						thumbMinSize={30}
						universal={true}>
						{
							this.props.result.length > 0 &&
							<div className="col l12 m12 result-search-box">
								<ul className="collection no-border">
									{(
										this.props.result.map((i) => {
											return (
												<AppMainResultBox
													key={i._id} {...i}
													onClick={this.props.onClick}
												/>
											)
										})
									)}
								</ul>
							</div>
							|| <div className="col l12 m12 result-search-box text-center padding-10">
								<span className="white-text bold">No results were found</span>
							</div>
							
						}
					</CustomScrollbars>
				}
			</section>
		)
	}
}









