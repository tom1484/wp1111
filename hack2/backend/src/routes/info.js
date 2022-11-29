// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter = req.query.mealFilter
    const typeFilter = req.query.typeFilter
    const sortBy = req.query.sortBy
    /****************************************/

    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }

    console.log(priceFilter)
    console.log(mealFilter)
    console.log(typeFilter)
    console.log(sortBy)

    // TODO Part I-3-a: find the information to all restaurants
    Info.find({}).exec().then(restaurants => {
        console.log("Got restaurants")

        let filtered = []
        for (let rest of restaurants) {
            let valid = true
            if (priceFilter && priceFilter.length > 0) {
                if (!priceFilter.find(p => p === getPrice(rest.price))) {
                    valid = false
                }
            }

            if (mealFilter && mealFilter.length > 0) {
                let mealValid = false
                for (let meal of mealFilter) {
                    if (rest.tag.find(p => p === meal)) {
                        mealValid = true
                        break
                    }
                }
                if (!mealValid) {
                    valid = false
                }
            }

            if (typeFilter && typeFilter.length > 0) {
                let typeValid = false
                for (let type of typeFilter) {
                    if (rest.tag.find(p => p === type)) {
                        typeValid = true
                        break
                    }
                }
                if (!typeValid) {
                    valid = false
                }
            }

            if (valid) {
                filtered.push(rest)
            }
        }

        if (sortBy) {
            filtered.sort((a, b) => {
                if (sortBy === 'price') {
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (a.price > b.price) {
                        return 1
                    }
                    return 0
                }
                if (sortBy === 'distance') {
                    if (a.distance < b.distance) {
                        return -1;
                    }
                    if (a.distance > b.distance) {
                        return 1
                    }
                    return 0
                }
            })
        }
        res.status(200).send({ message: 'success', contents: filtered })
    }).catch(e => {
        console.log("Failed to load restaurants")
        res.status(403).send({ message: 'error', contents: [] })
    })

    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // console.log(id)
    Info.find({ id: id }).exec().then(restaurant => {
        // console.log(`Got restaurant ${id}`)
        res.status(200).send({
            message: 'success',
            contents: restaurant
        })
    }).catch(e => {
        console.log("Failed to load restaurants")
        res.status(403).send({ message: 'error', contents: [] })
    })

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}