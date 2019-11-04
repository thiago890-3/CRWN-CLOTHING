import React from 'react'

import { Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import CategoryPage from '../collection/collection.component'
import CollectionsOverview from '../../components/collection-overview/collection-overview.component'

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action'
import { selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CategoryPageWithSpinner = WithSpinner(CategoryPage)

class ShopPage extends React.Component {



    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props
        fetchCollectionsStartAsync()
    }

    render() {
        const { match, isCollectionsLoaded } = this.props

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => 
                    <CollectionsOverviewWithSpinner isLoading={!isCollectionsLoaded}{...props} />} 
                />
                <Route path={`${match.path}/:collectionId`} render={(props) => 
                    <CategoryPageWithSpinner isLoading={!isCollectionsLoaded}{...props} />} 
                />
            </div>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)