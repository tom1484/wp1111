/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        // TODO Part I-3-b: get information of restaurants from DB
        instance.get('getSearch', {
            content: "content"
        }).then(res => {
            let filtered = []
            for (let rest of res.data.contents) {
                let valid = true
                if (state.priceFilter.length > 0) {
                    if (!state.priceFilter.find(p => p === getPrice(rest.price))) {
                        valid = false
                    }
                }

                if (state.mealFilter.length > 0) {
                    let mealValid = false
                    for (let meal of state.mealFilter) {
                        if (rest.tag.find(p => p === meal)) {
                            mealValid = true
                            break
                        }
                    }
                    if (!mealValid) {
                        valid = false
                    }
                }

                if (state.typeFilter.length > 0) {
                    let typeValid = false
                    for (let type of state.typeFilter) {
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
            // console.log(filtered)
            filtered.sort((a, b) => {
                if (state.sortBy === 'price') {
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (a.price > b.price) {
                        return 1
                    }
                    return 0
                }
                if (state.sortBy === 'distance') {
                    if (a.distance < b.distance) {
                        return -1;
                    }
                    if (a.distance > b.distance) {
                        return 1
                    }
                    return 0
                }
            })
            setRestaurant(filtered)
        })
    }

    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
        navigate('/restaurant/' + id, {
            state: {
            }
        });
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }

    const convertDistance = (distance) => {
        return `${(distance / 1000).toFixed(1)} km`
    }

    return (
        <div className='searchPageContainer'>
            {
                restaurants.map((item) => (
                    // TODO Part I-2: search page front-end
                    <div
                        className='resBlock'
                        id={item.id} key={item.id}
                        onClick={() => ToRestaurant(item.id)}
                    >
                        <div className='resImgContainer'>
                            <img className='resImg' src={item.img} />
                        </div>
                        <div className='resInfo'>
                            <div className='title'>
                                <p className='name'>{item.name}</p>
                                <p className='price'>{getPrice(item.price)}</p>
                                <p className='distance'>{convertDistance(item.distance)}</p>
                                {/* <p className='distance'>{item.distance}</p> */}
                            </div>
                            <p className='description'>{item.tag.join(', ')}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default SearchPage